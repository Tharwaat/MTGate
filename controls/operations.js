class random{
    
    constructor(){}

    generateID(IdSize){
        
        var num = Math.floor( (Math.random() * 1000000) + 1),
            len = num.toString().length,
            ID  = '';

        if(len < IdSize){
            
            var diff  = IdSize - len,
                zeros = '';

            for (let i = 0; i < diff; i++) zeros += '0';

            ID = 'tt' + zeros + num;           
        }
        else ID = 'tt' + num;

        return ID;
    }
   
}
module.exports = random;