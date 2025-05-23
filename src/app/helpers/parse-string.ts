export default class ParseString {
  static parseString(input: string): string {
    const parseInfo = input.split('');
    if (parseInfo.length !== 10) {
      console.log('Parse string must be 10 characters long');
      return 'ERROR';
    }
    let parseString = '';
    console.log(parseInfo);

    // 0   1     2      3      4     5     6    7      8      9
    // POS/case/gender/number/tense/voice/mood/person/gender/number


    const posChar = parseInfo[0];
    switch (posChar) {
      case 'n': parseString += 'noun: '; break;
      case 'v': parseString += 'verb: '; break;
      case 'l': parseString += 'participle: '; break;
      case 'a': parseString += 'adjective: '; break;
      case 'p': parseString += 'pronoun: '; break;
      case 'r': parseString += 'adverb '; break;
      case 'c': parseString += 'conjunction '; break;
      case 'i': parseString += 'interjection '; break;
      case 'd': parseString += 'determiner: '; break;
      case 'o': parseString += 'preposition '; break;
      case 't': parseString += 'particle '; break;
      case 'x': parseString += 'unknown '; break;
      default: break;
    }

    const substCaseChar = parseInfo[1];
    switch (substCaseChar) {
      case 'n': parseString += 'nominative '; break;
      case 'a': parseString += 'accusative '; break;
      case 'g': parseString += 'genitive '; break;
      case 'd': parseString += 'dative '; break;
      case 'l': parseString += 'locative '; break;
      case 'e': parseString += 'ablative '; break;
      case 'i': parseString += 'instrumental '; break;
      case 'v': parseString += 'vocative '; break;
      case 'x': parseString += 'unknown '; break;
      case '-': break
      default: break;
    }

    const substGenderChar = parseInfo[2];
    switch (substGenderChar) {
      case 'm': parseString += 'masculine '; break;
      case 'f': parseString += 'feminine '; break;
      case 'n': parseString += 'neuter '; break;
      case 'x': parseString += 'unknown '; break;
      case '-': break
      default: break;
    }

    const substNumberChar = parseInfo[3];
    switch (substNumberChar) {
      case 's': parseString += 'singular '; break;
      case 'd': parseString += 'dual '; break;
      case 'p': parseString += 'plural '; break;
      case 'x': parseString += 'unknown '; break;
      case '-': break
      default: break;
    }

    const verbTenseChar = parseInfo[4];
    switch (verbTenseChar) {
      case 'p': parseString += 'present '; break;
      case 'f': parseString += 'future '; break;
      case 'i': parseString += 'imperfect '; break;
      case 'a': parseString += 'aorist '; break;
      case 'r': parseString += 'perfect '; break;
      case 'c': parseString += 'pluperfect '; break;
      case 't': parseString += 'future perfect '; break;
      case 'x': parseString += 'unknown '; break;
      case '-': break
      default: break;
    }

    const verbVoiceChar = parseInfo[5];
    switch (verbVoiceChar) {
      case 'a': parseString += 'active '; break;
      case 'm': parseString += 'middle '; break;
      case 'p': parseString += 'passive '; break;
      case 'x': parseString += 'unknown '; break;
      case '-': break
      default: break;
    }

    const verbMoodChar = parseInfo[6];
    switch (verbMoodChar) {
      case 'i': parseString += 'indicative '; break;
      case 's': parseString += 'subjunctive '; break;
      case 'o': parseString += 'optative '; break;
      case 'm': parseString += 'imperative '; break;
      case 'n': parseString += 'infinitive '; break;
      case 'p': parseString += 'participle '; break;
      case 'x': parseString += 'unknown '; break;
      case '-': break
      default: break;
    }

    const verbPersonChar = parseInfo[7];
    switch (verbPersonChar) {
      case '1': parseString += '1st person '; break;
      case '2': parseString += '2nd person '; break;
      case '3': parseString += '3rd person '; break;
      case 'x': parseString += 'unknown '; break;
      case '-': break
      default: break;
    }

    const verbGenderChar = parseInfo[8];
    switch (verbGenderChar) {
      case 'm': parseString += 'masculine '; break;
      case 'f': parseString += 'feminine '; break;
      case 'c': parseString += 'common '; break;
      case 'n': parseString += 'neuter '; break;
      case 'x': parseString += 'unknown '; break;
      case '-': break
      default: break;
    }


    const verbNumberChar = parseInfo[9];
    switch (verbNumberChar) {
      case 's': parseString += 'singular '; break;
      case 'p': parseString += 'plural '; break;
      case 'd': parseString += 'dual '; break;
      case 'x': parseString += 'unknown '; break;
      case '-': break
      default: break;
    }

    return parseString.trim();
  }
}
