const products=[
  {id:'lemon-bread',name:'Lemon Bread',price:12.99,category:'bread',desc:'Tender, bright, and lovely with tea.',icon:'◒'},
  {id:'wheat-bread',name:'Wheat Bread',price:9.99,category:'bread',desc:'Hearty, soft, and ready for the sandwich board.',icon:'◓'},
  {id:'white-bread',name:'White Bread',price:9.99,category:'bread',desc:'The classic, soft-centered everyday loaf.',icon:'◔'},
  {id:'sourdough',name:'Sourdough',price:10.99,category:'bread',desc:'A rustic loaf with a crackling, golden crust.',icon:'◉'},
  {id:'focaccia',name:'Focaccia',price:8.99,category:'bread',desc:'Olive-oil rich and dimpled with care. Starts at $8.99.',icon:'▤'},
  {id:'chocolate-chip',name:'Chocolate Chip Cookies',price:2.99,category:'cookie',desc:'Big, buttery cookies studded with chocolate.',icon:'●'},
  {id:'snickerdoodle',name:'Snickerdoodle Cookies',price:2.99,category:'cookie',desc:'Cinnamon sugar and a soft, chewy center.',icon:'◉'},
  {id:'lemon-cookie',name:'Lemon Cookies',price:2.99,category:'cookie',desc:'Sunny, sweet, and delightfully bright.',icon:'◌'},
  {id:'dark-white-chip',name:'Dark Chocolate & White Chip',price:2.99,category:'cookie',desc:'Deep cocoa richness with creamy white chips.',icon:'●'}
];
const money=n=>`$${n.toFixed(2)}`;
function getCart(){try{return JSON.parse(localStorage.getItem('ld-cart'))||[]}catch{return[]}}
function saveCart(cart){localStorage.setItem('ld-cart',JSON.stringify(cart));updateCount()}
function add(id,name,price){const cart=getCart(),entry=cart.find(x=>x.id===id);entry?entry.qty++:cart.push({id,name,price,qty:1});saveCart(cart);renderCart()}
function updateCount(){const count=getCart().reduce((n,x)=>n+x.qty,0);document.querySelectorAll('.cart-count').forEach(el=>el.textContent=count)}
function card(p,order=false){const choices=p.category==='cookie'?`<label class="cookie-size"><span>Size</span><select data-cookie-size><option value="2.99">Single big cookie — $2.99</option><option value="6.99">Six cookies — $6.99</option><option value="12.99">One dozen — $12.99</option></select></label>`:'';return `<article class="${order?'order-item':'product-card'}"><div class="${order?'':'illustration'}">${order?'':p.icon}</div><h3>${p.name}</h3><p>${p.desc}</p>${choices}<div class="${order?'':'product-foot'}">${order?'':`<span>${p.category==='cookie'?'From ':''}${money(p.price)}</span>`}<button class="${order?'button small-add':'small-add'}" data-add="${p.id}">${order?'Add to order':'Add'}</button></div></article>`}
document.querySelectorAll('.product-grid').forEach(grid=>{const cat=grid.dataset.category;grid.innerHTML=products.filter(p=>p.category===cat).map(p=>card(p)).join('')});
const orderProducts=document.querySelector('.order-products');if(orderProducts)orderProducts.innerHTML=products.map(p=>card(p,true)).join('');
document.addEventListener('click',e=>{const id=e.target.dataset.add;if(id){const p=products.find(p=>p.id===id),select=e.target.closest('article').querySelector('[data-cookie-size]');const price=select?Number(select.value):p.price;const suffix=select?` — ${select.options[select.selectedIndex].text.split(' — ')[0]}`:'';add(`${id}-${price}`,p.name+suffix,price)}if(e.target.dataset.remove){const cart=getCart();const item=cart.find(x=>x.id===e.target.dataset.remove);if(item){item.qty--;saveCart(cart.filter(x=>x.qty));renderCart()}}});
function renderCart(){const box=document.querySelector('.cart-items'),total=document.querySelector('.cart-total strong');if(!box||!total)return;const cart=getCart();if(!cart.length){box.innerHTML='<p class="empty-cart">Your basket is waiting for something delicious.</p>';total.textContent='$0.00';return}let sum=0;box.innerHTML=cart.map(x=>{sum+=x.price*x.qty;return `<div class="cart-item"><span>${x.name} × ${x.qty}</span><span>${money(x.price*x.qty)}<br><button data-remove="${x.id}">Remove one</button></span></div>`}).join('');total.textContent=money(sum)}
document.querySelector('.checkout-form')?.addEventListener('submit',e=>{e.preventDefault();const cart=getCart(),msg=e.currentTarget.querySelector('.form-message');if(!cart.length){msg.textContent='Please add a bake before submitting your order.';return}const name=new FormData(e.currentTarget).get('name');msg.textContent=`Thank you, ${name}! Your order request is ready for the bakery.`;saveCart([]);renderCart();e.currentTarget.reset()});
document.querySelector('.nav-toggle')?.addEventListener('click',e=>{const nav=document.querySelector('.primary-nav'),open=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open)});updateCount();renderCart();
