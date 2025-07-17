import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { catchError, EMPTY, firstValueFrom, map, Observable, ObservableInput, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public findPath: string = `${environment.apiUrl}/api/v1/`;
  public savePath: string = '';
  public errorPath: string = '';
  public errorMessage: string = '';
  private isLoading: boolean = false;
  public httpErrorFlag: boolean = false;

  constructor(private http: HttpClient) {
  }

  // Hydrate that returns an observable
  public hydrate$(serviceName: string, searchModel?: SearchModel): Observable<any> {
    if (!searchModel) {
        searchModel = new SearchModel();
    }
    const finalUrl = this.toQueryString(this.findPath + serviceName, searchModel);
    console.log('finding: ' + finalUrl);
    return this.http.get(finalUrl);
  }

  public async HydrateAsync(serviceName: string, searchModel?: SearchModel): Promise<any> {
    if (!searchModel) {
        searchModel = new SearchModel();
    }
    const finalUrl = this.toQueryString(this.findPath + serviceName, searchModel);
    console.log('finding: ' + finalUrl);
    return await firstValueFrom(this.http.get(finalUrl));
  }


  // Wrapper for find() (HTTP GET) that accepts the service name, the list to hydrate, and a SearchModel that will
  // be turned into a query string. An optional callback function can be used to operate within the asynchronous
  // context after the hydrate function completes.
  public hydrate(serviceName: string, targetList: any[], searchModel?: SearchModel, callback?: Function) {
    if (!searchModel) {
      searchModel = new SearchModel();
    }

    this.find(serviceName, searchModel).subscribe(data => {
        targetList.length = 0;
        targetList.push.apply(targetList, data);

        if (callback) {
          callback();
        }
      }//,
      // err => {
      //   this.httpErrorFlag = true;
      //   console.error(err);
      //   console.error('Server call failed')
      // });
  )}

  // Wrapper function for find() (HTTP GET) similar to Hydrate() above but for returning a single item, usually an object
  // from the server. The callback is not optional but is the way to extract the single object from the asynchronous
  // context. E.g. data => { this.myObj = data;}
  public single(serviceName: string, searchModel: SearchModel, callback: Function) {
    if (!searchModel) {
        searchModel = new SearchModel();
    }

    this.find(serviceName, searchModel).subscribe((data: any[]) => {
        switch (data.length) {
            case 0:
              callback(null);
                throw new Error('No data found');
            case 1:
                callback(data[0]);
                break;
            default:
                throw new Error('More than one record was returned');
        }
      });

    console.log("Loaded...");
  }

  // Wrapper for HTTP GET. This method is not user-facing. It builds gets the query string, builds the final URL,
  // executes the http.get method, and returns the data in an observable. The service name is checked for
  // "meta" and "catalog" options.
  private find(serviceName: string, searchModel: SearchModel): Observable<any> {
    // if (this.alerts.hideOnNextSuccess) {
    //   this.alerts.hide();
    // }

    const finalUrl = this.toQueryString(this.findPath + serviceName, searchModel);
    console.log('finding: ' + finalUrl);

    // This is the find() return statement. The returns below belong to the RxJs operators.
    return this.http.get(finalUrl).pipe(
      // map(data => {
      //   if(data['data']) {
      //     if(data['data'].length == 0 && data['error']) {
      //       console.error(data['error'].message)
      //     } else {
      //       let rxp = /[a-zA-z]+\/meta/;
      //       let serviceNameRegEx = rxp.exec(serviceName) ? rxp.exec(serviceName) : [];
      //       switch (serviceName) {
      //         case serviceNameRegEx[0]:
      //           return data['Columns'];
      //         case 'catalog':
      //           return data;
      //         default:
      //           return data['data'];
      //       }
      //     }
      //   } else {
      //     return data;
      //   }
      // }),
      catchError(error => {
        this.httpErrorFlag = true;
        console.log("ERROR -- " + serviceName);
        console.error(error);
        console.error(error);
        return EMPTY;
      })
    );
  }

  // Wrapper for HTTP POST. It takes the service name, payload, and features callback functions for handling successful
  // POST or handling an error returned instead.
  public save(featureName: string, payload: any, callback?: Function, errorCallBack?: Function) {
    return this.http.post(this.savePath, payload)
      .subscribe(data => {
        console.log("---Save data returned from server---");
        console.log(data);
        console.log('Your data was successfully processed.');

        if (callback != null) {
          callback();
        }
      // }, error => {
      //     console.log(error);
      //     console.error(error.error);
      //     if (errorCallBack != null) {
      //         errorCallBack(error.error);
      //     }
      // });
    });
  }

  // Basic wrapper for Angular HttpClient.get()
  public httpGet(url: string, options: any): Observable<any> {
    return this.http.get(url, options);
  }

  protected handleError(error: { error: any; }): ObservableInput<{}> {
    console.log('--------HERE IS THE ERROR:');
    console.error(error);
    console.log('--------THAT WAS THE ERROR:');

    // this.alerts.error('Error: ' + error.error);
    console.error(this.errorMessage);
    // this.alerts.hideOnNextSuccess = true;

    return throwError(error.error || 'Server error');
  }

  // Converts the SearchModel object into a query string.
  public toQueryString(base: string, model: SearchModel) {
    if(base !== 'catalog' && base !== 'meta') {
      let filter = '?f=';
      for (let i = 0; i < model.filter.length; i++) {
        filter += '(' + model.filter[i].name + ' ' + model.filter[i].operator + ' \'' + model.filter[i].value + '\')';
      }

      const sort = model.sort.length > 0 ? ('&s=' + model.sort.join(',')) : '';
      const cols = model.columns.length > 0 ? ('&c=' + model.columns.join(',')) : '';
      const size = model.pageSize > 0 ? '&ps=' + model.pageSize : '';
      const index = model.pageIndex > 0 ? '&pi=' + model.pageIndex : '';
      const distinct = model.isDistinct ? '&d=true' : '';
      const outputFormats = model.outputFormats.length > 0 ? ('&o=' + model.outputFormats.join(',')) : '';
      return base + filter + cols + sort + outputFormats + size + index + distinct + '&zulu=' + new Date().getTime();
    } else {
      return base;
    }
  }

  // Document upload
  // upload(service, payload, callback?, errorCallback?) {

  //   let uploadUrl = `${this.savePath}${service}/`;

  //   return this.http.post(uploadUrl, payload, {
  //     headers: {
  //       'Authorization': 'Bearer ' + this.tokens.localToken()
  //     }
  //   }).subscribe(data => {
  //     console.log("---Save data returned from server---");
  //     console.log(data);
  //     this.alerts.success('Your data was successfully processed.');

  //     if (callback != null) {
  //       callback();
  //     }
  //   }, error => {
  //     console.log(error);
  //     this.alerts.error(error.error.FriendlyMessage || error.message);
  //     if (errorCallback != null) {
  //       errorCallback(error.error);
  //     }
  //   });
  // }

  // Service for taking the columns of a table by /meta and generating a TypeScript class from it
  // genClass(serviceName: string) {
  //   const headers = {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': 'Bearer ' + this.tokens.localToken()
  //   };

  //   this.http.get(this.findPath + serviceName + '/meta', { headers: headers })
  //     .pipe(map(data => { return data; }),
  //       catchError(error => {
  //         this.handleError(error);
  //         this.alerts.error(error);
  //         return EMPTY;
  //       })
  //     ).subscribe(data => {
  //     let obj = '';
  //     const cols = data['Columns'];
  //     cols.forEach(c => {
  //       obj += c['AttributeName'] + ': ' + c['DataType'] + ';\n';
  //     });

  //     console.log(obj.split('decimal').join('number'));
  //   });
  // }
}
