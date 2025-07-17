import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Thread } from '../models/thread.model';
import { Message } from '../models/message.model';
import { ContextService } from '../Services/context.service';
import { Socket, Channel } from 'phoenix';

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, NgClass, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  contextService = inject(ContextService);
  userId = this.contextService.getUser()?.accountId?.toString() || '';
  @Input() thread: Thread | null = null;
  messages = new Array<Message>();
  userInput = '';
  private socket: Socket | null = null;
  private channel: Channel | null = null;

  ngOnInit(): void {
    this.openSocket();
    console.log(this.userId)
  }

  ngOnDestroy(): void {
    this.channel?.leave();
    this.socket?.disconnect();
  }

  openSocket() {
    this.socket = new Socket('ws://localhost:4000/socket', { params: { user_id: this.userId } });
    this.socket.connect();

    this.channel = this.socket.channel(`thread:${this.thread?.id}`, {});
    this.channel.join()
      .receive('ok', resp => { console.log('Joined successfully', resp); })
      .receive('error', resp => { console.log('Unable to join', resp); });
    this.channel.on('new_message', (message: Message) => {
      console.log('New message received', message);
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.userInput.trim() && this.thread) {
      const newMessage: Message = {
        id: this.generateMessageId(),
        body: this.userInput,
        userId: this.userId,
        createdAt: new Date().toISOString(),
      };
      this.channel?.push('new_message', newMessage)
        .receive('ok', (resp) => {
          console.log('Message sent successfully', resp);
          this.messages.push(newMessage);
        })
        .receive('error', (resp) => { console.log('Failed to send message', resp); });

      this.userInput = '';
    }
  }

  private generateMessageId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

}
