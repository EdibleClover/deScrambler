import engine from "php-parser"
import unparse from "php-unparser"
/*

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

#Redoing this entire mess
Drop parsing php, and highlighting text, or at least disable by default

$$  Decoders I would like:
base64
\x
chr()
Concatanations with all the above 
formatting by \n ;
unPack Js && perhaps somekind of function hook





$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


*/
/* Gobble Gobble */
var parser = new engine({
    // some options :
    parser: {
        extractDoc: true,
        php7: false
    },
    ast: {
        withPositions: true
    }
});

var options = {
    indent: true,
    dontUseWhitespaces: true,
    shortArray: true,
    bracketsNewLine: true,
    forceNamespaceBrackets: true,
    collapseEmptyLines: false
};
/*
let parsed = parser.parseEval(code)
let json = JSON.stringify(parsed) 
///We can parse the AST to JSON to output the object
///console.log(json)
let formatted = unparse(parsed, options)
*/

/**Will handle setting the language selection and any decoding that is not language specific */
class Decoder {
    constructor(language) {
        this.language = language
    }
    getLang = () => {
        return this.language
    }

    decodehex = (string) => {
        return string.replace(/\\x([0-9A-Fa-f]{2})/gm, function () {
            return String.fromCharCode(parseInt(arguments[1], 16));
        });
    };
    decodeChar = (char) => {
        return char.replace(/chr\(([0-9]{1,3})\)/gmi, function(a,b){
            let x = String.fromCharCode(b)
            return "\""+x+"\""   //To keep these as a string in teh original code
        })
    }
    fixConcats = (string) => {
        return string.replace(/["']\s*?\.\s*?["']/g, '')
    }
    //This seems odd
    removeBadChars = (string) => {
        let reg = /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g;
        return  string.replace(reg, '')
    }

    ConcatArraysManually = (string) => {
        return string
    } 
    // Replaces all base64 strings 
    base64Decode = (string) => {
        return string.replace(/base64_decode\(['"](.*?)['"]\)/g, function (a,b) {
        let x = "'" + atob(b) + "'"
            return x
        });
    }
    

}
/*Will have the formatting libs in here, also any bullshit that will need to be tweeked */
class Formatter extends Decoder {
    constructor(language) {
        super(language)
    }
    /**This is buggy at best */
    formatPHP = (code) => {
        try {
            let parsed = parser.parseCode(code)
            console.log(parsed)
            let formatted = unparse(parsed, options)
            return formatted
        }
        catch (e) { return e }
    }
    /*Cheat and just add line breaks after ; */
    hardFormat = (string) => {
        return string.replace(/(;)/g, function (a,b) {
            let x = ";\n"
                return x
            });
    }
}

export { Decoder, Formatter }

/** 
badChars = (string) => {
    let stripped = string.replace(/[^\x20-\x7E]/g, '');
    return stripped
    
}


fromChar = (string) => {
   //Removing lines isn't a great idea, need to find a way around this

    //let RLINE = /\s/gm
   // let singeLine = string.replace(RLINE, '')
    let regex = /chr\(([0-9]{2,3})\)/igs
    let good = string.replace(regex, function(matches,b){
       return String.fromCharCode(b)
    })
   return good
}


decodehex = (string) => {
  return string.replace(/\\x([0-9A-Fa-f]{2})/g, function() {
      return String.fromCharCode(parseInt(arguments[1], 16));
  });
};
*/