describe( "MEMBUAT BARANG", function() {

    // menentukan letak fixtures
    jasmine.getFixtures().fixturesPath = "tests/fixtures";

    beforeEach(function() {

        loadFixtures("form.html");

        jasmine.Ajax.useMock();
    });

    it("Should display error element when post fails", function() {

        buatBarangPresenter.buat( { nama: "celana", pemilik: "orang" }, buatBarang );

        var request = mostRecentAjaxRequest();
        request.response({
            status: 201
        });

        expect( $( ".alert-error" ).length).toEqual( 1 );

    });

});