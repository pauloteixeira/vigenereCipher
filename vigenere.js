/*
 * Copyright Paulo A. Teixeira 2017
 * MIT License : http://adampritchard.mit-license.org/
 */
const Vigenere = () => {
    this.KEY             = 'vigenere'; // please pass the key for parameter and don't use this one
    this.ALPHABET_UPPER  = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','W','Z','Ç'];
    this.ALPHABET_LOW    = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','w','z','ç'];
    this.ALPHABET_LEN    = this.ALPHABET_LOW.length;

    this.encripty = ( message, key = this.KEY ) => {
        const keyU          = key.toUpperCase();
        const keyL          = key.toLowerCase();
        let wordArray       = this.removeAccentuation( message ).split(' ');
        let stringMap       = this.repeatKeyUntilDoneWord(this.removeAccentuation( message ), key).split(' ');
        let result          = '';

        for( var i = 0; i < wordArray.length; i++ ) {
            var map    = stringMap[i];
            var word   = wordArray[i];
            var qnt    = map.length;

            if( i > 0 ) {
                result += ' ';
            }

            for( var y = 0; y < qnt; y++ ) {
                let chars = ( this.ALPHABET_UPPER.join('').indexOf( map.charAt(y) ) == -1 ) ? this.ALPHABET_LOW.join('') : this.ALPHABET_UPPER.join('');
                pos = chars.indexOf( map.charAt(y) );
                let character = chars.charAt( ( ( pos + chars.indexOf( word.charAt(y) ) ) % this.ALPHABET_LEN ) );
                result += character;
            }
        }

        return result;
    };

    this.dencripty = ( message, key = this.KEY ) => {
        const keyU          = key.toUpperCase();
        const keyL          = key.toLowerCase();
        let wordArray       = message.split(' ');
        let stringMap       = this.repeatKeyUntilDoneWord(message, key).split(' ');
        let result          = '';

        for( var i = 0; i < wordArray.length; i++ ) {
            let map    = stringMap[i];
            let word   = wordArray[i];
            let qnt    = word.length;

            if( i > 0 ) {
                result += ' ';
            }

            for( var y = 0; y < qnt; y++ ) {
                let chars        = ( this.ALPHABET_UPPER.join('').indexOf( word.charAt(y) ) == -1 ) ? this.ALPHABET_LOW.join('') : this.ALPHABET_UPPER.join('');
                let letter       = chars.charAt( this.ALPHABET_LEN - (chars.indexOf( word.charAt(y) )) );
                let indexEnc     = this.ALPHABET_LEN - chars.indexOf( letter );
                let mapedLetter  = map.charAt(y);
                let indexMap     = chars.indexOf(mapedLetter);
                let positionChar = this.ALPHABET_LEN - ((this.ALPHABET_LEN - indexEnc) + indexMap ) % this.ALPHABET_LEN;
                let character    = chars.charAt( (positionChar == this.ALPHABET_LEN) ? 0 : positionChar );

                result += character;
            }
        }

        return result;
    };

    this.repeatKeyUntilDoneWord = ( message, key = this.KEY ) => {
        const keyU          = key.toUpperCase();
        const keyL          = key.toLowerCase();
        let letterQuantity  = 0;
        let wordArray       = message.split(' ');
        let result          = '';
        let pos             = -1;
        let totalKeyQnt     = keyL.length;

        for( var i = 0; i < wordArray.length; i++ ) {
            let word = wordArray[i];
            let qnt  = word.length;

            if( i > 0 ) {
                result += ' ';
            }

            for( var y = 0; y < qnt; y++ ) {
                let chars = ( this.ALPHABET_UPPER.join('').indexOf( word.charAt(y) ) == -1 ) ? keyL : keyU;

                if( pos+1 < chars.length ){
                    pos++;
                }
                else {
                    pos = 0;
                }

                result += chars.charAt( pos );
            }
        }

        return result;
    }

    this.removeAccentuation = ( arrayChars ) => {
        const charsAccents  = 'á,à,â,ã,é,è,ê,í,ï,ó,ô,õ,ö,ú,ñ'.split(',');
        const chars         = 'a,a,a,a,e,e,e,i,i,o,o,o,o,u,n'.split(',');
        let result          = [];

        for( var i = 0; i < arrayChars.length; i++ ){
            let index = charsAccents.indexOf(arrayChars.charAt(i));
            if(  index === -1 ) {
                result.push(arrayChars.charAt(i));
            }
            else {
                result.push(chars[index]);
            }
        }

        return result.join('');
    }
}
