document.addEventListener("DOMContentLoaded",()=>{

  /* -------------------- QR Scanner -------------------- */
  const startScanBtn=document.getElementById("startScanBtn");
  const qrReaderDiv=document.getElementById("qr-reader");
  if(startScanBtn && qrReaderDiv){
    startScanBtn.addEventListener("click",()=>{
      qrReaderDiv.innerHTML="";
      const html5QrCode=new Html5Qrcode("qr-reader");
      html5QrCode.start({facingMode:"environment"},{fps:10,qrbox:250},
        decodedText=>{ html5QrCode.stop().then(()=>{ window.location.href=decodedText; }); },
        err=>{}
      ).catch(err=>console.error(err));
    });
  }

  /* -------------------- Menu & Cart -------------------- */
  const menu=document.getElementById("menu");
  if(menu){
    const menuItems=[
      {name:"Margherita Pizza",price:250,img:"https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg"},
      {name:"Cheese Burger",price:150,img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
      {name:"Biryani",price:180,img:"https://images.unsplash.com/photo-1589302168068-964664d93dc0"},
      {name:"Doughnut",price:90,img:"https://images.unsplash.com/photo-1551024601-bec78aea704b"},
      {name:"Hamburger",price:100,img:"https://images.unsplash.com/photo-1550547660-d9450f859349"},
      {name:"Brownie Sundae",price:120,img:"https://upload.wikimedia.org/wikipedia/commons/6/68/Chocolatebrownie.JPG"},
    ];
    const cart=[];
    const modal=document.getElementById("orderModal");
    const orderList=document.getElementById("orderList");
    const totalPrice=document.getElementById("totalPrice");
    const viewCartBtn=document.getElementById("viewCartBtn");
    const closeModal=document.getElementById("closeModal");
    const placeOrderBtn=document.getElementById("placeOrderBtn");
    const table=new URLSearchParams(window.location.search).get("table");
    const tableInfo=document.getElementById("tableInfo");
    if(tableInfo) tableInfo.textContent=`Table No: ${table||"N/A"}`;

    menuItems.forEach((item,index)=>{
      const div=document.createElement("div");
      div.classList.add("menu-item");
      div.innerHTML=`<img src="${item.img}" alt="${item.name}">
        <div class="menu-details">
        <h3>${item.name}</h3>
        <p class="price">₹${item.price}</p>
        <button class="btn add" data-index="${index}">Add to Cart</button>
        </div>`;
      menu.appendChild(div);
    });

    document.addEventListener("click",(e)=>{
      if(e.target.classList.contains("add")){
        const index=e.target.dataset.index;
        cart.push(menuItems[index]);
        alert(`${menuItems[index].name} added to cart 🛒`);
      }
      if(e.target===viewCartBtn){ renderCart(); modal.classList.add("show"); }
      if(e.target===closeModal){ modal.classList.remove("show"); }
    });

    function renderCart(){
      orderList.innerHTML="";
      let total=0;
      cart.forEach(item=>{
        const li=document.createElement("li");
        li.textContent=`${item.name} - ₹${item.price}`;
        orderList.appendChild(li);
        total+=item.price;
      });
      totalPrice.textContent=`Total: ₹${total}`;
    }

    placeOrderBtn.addEventListener("click",()=>{
      alert("✅ Order placed successfully!");
      cart.length=0;
      modal.classList.remove("show");
    });
  }

  /* -------------------- Contact Form -------------------- */
  const contactForm=document.getElementById("contactForm");
  const formMessage=document.getElementById("formMessage");
  if(contactForm){
    contactForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      const name=contactForm.name.value.trim();
      const email=contactForm.email.value.trim();
      const message=contactForm.message.value.trim();
      if(!name||!email||!message) return;
      formMessage.textContent=`Thank you ${name}! Your message has been received.`;
      contactForm.reset();
    });
  }

});

