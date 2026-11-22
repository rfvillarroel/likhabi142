(function(){
  var say=function(el,msg,ok){el.textContent=msg;el.style.color=ok?"#1D1D1B":"#8A1C1C"};
  var mail=function(to,s,b){window.location.href="mailto:"+to+"?subject="+encodeURIComponent(s)+"&body="+encodeURIComponent(b)};
  var val=function(f,n){return f.elements[n].value.trim()};

  var cf=document.getElementById("contact-form");
  if(cf){cf.addEventListener("submit",function(e){
    e.preventDefault();var out=cf.querySelector("[data-status]");
    if(!cf.checkValidity()){cf.classList.add("was-validated");say(out,"Please fix the highlighted fields, then try again.",false);cf.querySelector(":invalid").focus();return}
    mail("hello@examplewebsite142.com",val(cf,"subject")||"LikHabi inquiry","Name: "+val(cf,"name")+"\nEmail: "+val(cf,"email")+"\n\nMessage:\n"+val(cf,"message"));
    say(out,"Your email app should open now. If it does not, write to hello@examplewebsite142.com.",true);
  })}

  var of=document.getElementById("order-form");
  if(of){
    var qty=of.elements.qty,err=document.getElementById("size-error"),out=of.querySelector("[data-status]");
    var clamp=function(){var n=parseInt(qty.value,10);if(isNaN(n)||n<1)n=1;if(n>20)n=20;qty.value=n;return n};
    document.getElementById("qty-minus").addEventListener("click",function(){qty.value=parseInt(qty.value,10)-1;clamp()});
    document.getElementById("qty-plus").addEventListener("click",function(){qty.value=parseInt(qty.value,10)+1;clamp()});
    qty.addEventListener("change",clamp);
    of.addEventListener("change",function(e){if(e.target.name==="size")err.classList.remove("show")});
    of.addEventListener("submit",function(e){
      e.preventDefault();
      var size=of.querySelector("input[name=size]:checked");
      if(!size){err.classList.add("show");say(out,"Choose a size to continue.",false);of.querySelector("input[name=size]").focus();return}
      var n=clamp(),price=parseInt(of.dataset.price,10);
      mail("orders@examplewebsite142.com","Order: "+of.dataset.product,
        "Hello LikHabi,\n\nI would like to order:\n\nProduct: "+of.dataset.product+"\nSize: "+size.value+"\nQuantity: "+n+
        "\nPrice each: PHP "+price+"\nTotal: PHP "+(price*n)+"\n\nPlease add your details before sending:\nName:\nContact number:\nDelivery address:\n\nThank you!");
      say(out,"Your email app should open now. Add your name and delivery address, then press send. If it does not open, write to orders@examplewebsite142.com.",true);
    });
  }
})();
