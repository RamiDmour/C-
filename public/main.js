$(function (){
const modalSearchInput = $(".modalSearchInput")

modalSearchInput.on('keyup', function (e) {
    switch (e.which) {
        case 16: return; // Shift
        case 17: return; // Ctrl
        case 18: return; // Alt
        case 20: return;
        case 35: return; // End
        case 36: return; // Home
        case 37: return; // cursor left
        case 38: return; // cursor up
        case 39: return; // cursor right
        case 40: return; // cursor down
        case 78: return; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
        case 110: return; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
        case 190: return;
    }
        var $this = $(this);
        var $delay = 1000;

        clearTimeout($this.data('timer'));

        $this.data('timer', setTimeout(function () {
            $this.removeData('timer');
            
            $.ajax({
                type: "POST",
                url: "/search",
                data: {
                  text: modalSearchInput.val()
                },
                success: function(req){
                  // console.log(req);
                  
                  req.map(function(m){
                  //   b = document.createElement("div");
                  //   b.setAttribute('class', 'result-item');
                  //   b.innerHTML = m;
                  //   $('.result').append(m);
                    console.log(`${m.hits} |  ${m.name}`);
                  })
                  console.log(`count - ${req.length}`)
                  console.log('---------------------------------------------------------------------------');
                  
                }
              });
        }, $delay))   
})
})
