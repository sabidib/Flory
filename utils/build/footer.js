if ( typeof define === 'function' && define.amd ) {
  
    define( 'flory',Flory );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

    module.exports = Flory;

}