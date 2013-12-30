var buatBarangPresenter = {

    buat: function( data, model ) {

        model.buat( data )
        .done(function() {
            
            // kode ketka sukses
            $( "#area-notifikasi" ).append( "<div class='alert-sukses'></div>" );
            
        })
        .fail(function() {
            // kode ketika gagal
            $( "#area-notifikasi" ).append( "<div class='alert-error'></div>" );

        });

    }

};