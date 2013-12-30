var buatBarang = {

    buat: function( data ) {

        return $.post( "barang.php", data );

    }

};