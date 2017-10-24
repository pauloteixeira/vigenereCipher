var Vigenere = function () {
    this.KEY             = 'vigenere'; // please pass the key for parameter and don't use this one
    this.ALPHABET_UPPER  = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','W','Z','Ç'];
    this.ALPHABET_LOW    = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','y','w','z','ç'];
    this.ALPHABET_LEN    = this.ALPHABET_LOW.length;

    this.encripty = function( message, key = this.KEY ) {
        var keyU            = key.toUpperCase();
        var keyL            = key.toLowerCase();
        var wordArray       = this.removeAccentuation( message ).split(' ');
        var stringMap       = this.repeatKeyUntilDoneWord(this.removeAccentuation( message ), key).split(' ');
        var result          = '';

        for( var i = 0; i < wordArray.length; i++ ) {
            var map    = stringMap[i];
            var word   = wordArray[i];
            var qnt    = map.length;

            if( i > 0 ) {
                result += ' ';
            }

            for( var y = 0; y < qnt; y++ ) {
                var chars = ( this.ALPHABET_UPPER.join('').indexOf( map.charAt(y) ) == -1 ) ? this.ALPHABET_LOW.join('') : this.ALPHABET_UPPER.join('');
                pos = chars.indexOf( map.charAt(y) );
                var character = chars.charAt( ( ( pos + chars.indexOf( word.charAt(y) ) ) % this.ALPHABET_LEN ) );
                result += character;
            }
        }

        return result;
    };

    this.dencripty = function( message, key = this.KEY ) {
        var keyU            = key.toUpperCase();
        var keyL            = key.toLowerCase();
        var wordArray       = message.split(' ');
        var stringMap       = this.repeatKeyUntilDoneWord(message, key).split(' ');
        var result          = '';

        for( var i = 0; i < wordArray.length; i++ ) {
            var map    = stringMap[i];
            var word   = wordArray[i];
            var qnt    = word.length;

            if( i > 0 ) {
                result += ' ';
            }

            for( var y = 0; y < qnt; y++ ) {
                var chars        = ( this.ALPHABET_UPPER.join('').indexOf( word.charAt(y) ) == -1 ) ? this.ALPHABET_LOW.join('') : this.ALPHABET_UPPER.join('');
                var letter       = chars.charAt( this.ALPHABET_LEN - (chars.indexOf( word.charAt(y) )) );
                var indexEnc     = this.ALPHABET_LEN - chars.indexOf( letter );
                var mapedLetter  = map.charAt(y);
                var indexMap     = chars.indexOf(mapedLetter);
                var positionChar = this.ALPHABET_LEN - ((this.ALPHABET_LEN - indexEnc) + indexMap ) % this.ALPHABET_LEN;
                var character    = chars.charAt( (positionChar == this.ALPHABET_LEN) ? 0 : positionChar );

                result += character;
            }
        }

        return result;
    };

    this.repeatKeyUntilDoneWord = function( message, key = this.KEY ) {
        var keyU            = key.toUpperCase();
        var keyL            = key.toLowerCase();
        var letterQuantity  = 0;
        var wordArray       = message.split(' ');
        var result          = '';
        var pos             = -1;
        var totalKeyQnt     = keyL.length;

        for( var i = 0; i < wordArray.length; i++ ) {
            var word = wordArray[i];
            var qnt = word.length;

            if( i > 0 ) {
                result += ' ';
            }

            for( var y = 0; y < qnt; y++ ) {
                var chars = ( this.ALPHABET_UPPER.join('').indexOf( word.charAt(y) ) == -1 ) ? keyL : keyU;

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

    this.removeAccentuation = function( arrayChars ) {
        var charsAccents = 'á,à,â,ã,é,è,ê,í,ï,ó,ô,õ,ö,ú,ñ'.split(',');
        var chars        = 'a,a,a,a,e,e,e,i,i,o,o,o,o,u,n'.split(',');
        var result       = [];

        for( var i = 0; i < arrayChars.length; i++ ){
            var index = charsAccents.indexOf(arrayChars.charAt(i));
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
