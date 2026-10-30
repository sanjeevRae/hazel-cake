import { useEffect, useState } from 'react'

type Page = 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'custom' | 'gallery' | 'about' | 'contact'

const photos = {
  hero: 'https://images.unsplash.com/photo-1719512037487-78e399b58a53?auto=format&fit=crop&w=1800&q=90',
  wedding: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1000&q=85',
  floral: 'https://images.unsplash.com/photo-1525257831700-183b9b8bf5c4?auto=format&fit=crop&w=1000&q=85',
  pink: 'https://images.unsplash.com/photo-1559373098-e1caaccae791?auto=format&fit=crop&w=1000&q=85',
  bakery: 'https://images.unsplash.com/photo-1634148726948-c15ccfe5db75?auto=format&fit=crop&w=1200&q=85',
  pastry: 'https://images.unsplash.com/photo-1731399295775-45dc1fc7e52a?auto=format&fit=crop&w=1000&q=85',
  chocolate: 'https://images.unsplash.com/photo-1548865164-1f50430ddd6f?auto=format&fit=crop&w=900&q=85',
  chocolate2: 'https://images.unsplash.com/photo-1613563952058-93bc5bff5591?auto=format&fit=crop&w=900&q=85',
  strawberry: 'https://images.unsplash.com/photo-1623428454614-abaf00244e52?auto=format&fit=crop&w=900&q=85',
  occasion: 'https://images.unsplash.com/photo-1604702433171-33756f3f3825?auto=format&fit=crop&w=900&q=85',
  custom: 'https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?auto=format&fit=crop&w=1200&q=90',
}

const categories = [
  ['Birthday Cakes', photos.chocolate2], ['Wedding Cakes', photos.wedding],
  ['Anniversary Cakes', photos.pink], ['Chocolate Cakes', photos.chocolate],
  ['Designer Cakes', photos.floral], ['Cupcakes', 'https://images.unsplash.com/photo-1629600878103-cadd226d736e?auto=format&fit=crop&w=800&q=85'],
  ['Pastries', photos.pastry], ['Special Occasions', photos.occasion],
]

const products = [
  { name: 'Chocolate Truffle Cake', note: 'Silky ganache · Belgian cocoa', price: '1,850', image: photos.chocolate, rating: '4.9', reviews: 124 },
  { name: 'Red Velvet Cake', note: 'Cream cheese · Red velvet crumb', price: '1,650', image: photos.pink, rating: '4.8', reviews: 98 },
  { name: 'Black Forest Cake', note: 'Dark cherry · Chocolate shavings', price: '1,450', image: photos.chocolate2, rating: '4.9', reviews: 86 },
  { name: 'Strawberry Cream Cake', note: 'Fresh berries · Vanilla chantilly', price: '1,550', image: photos.strawberry, rating: '4.7', reviews: 72 },
  { name: 'Belgian Chocolate Cake', note: '70% dark chocolate · Fudge', price: '2,150', image: 'https://images.unsplash.com/photo-1548865163-afb128596c1e?auto=format&fit=crop&w=900&q=85', rating: '5.0', reviews: 64 },
  { name: 'Vanilla Fresh Cream Cake', note: 'Madagascan vanilla · Light cream', price: '1,350', image: photos.occasion, rating: '4.8', reviews: 55 },
]

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    upload: <><path d="M12 16V4m-5 5 5-5 5 5" /><path d="M5 15v5h14v-5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`logo ${light ? 'logo-light' : ''}`}><img className="logo-mark" src={`${import.meta.env.BASE_URL}logo.webp`} alt="Hazel Cake" /><span><strong>HAZEL</strong><small>CAKE · NEPAL</small></span></div>
}

function Button({ children, outline = false, onClick, type = 'button' }: { children: React.ReactNode; outline?: boolean; onClick?: () => void; type?: 'button' | 'submit' }) {
  return <button type={type} className={`btn ${outline ? 'btn-outline' : ''}`} onClick={onClick}>{children}<Icon name="arrow" size={17} /></button>
}

function Header({ go, cartCount }: { go: (p: Page) => void; cartCount: number }) {
  const [menu, setMenu] = useState(false)
  const links: [string, Page][] = [['Home', 'home'], ['About Us', 'about'], ['Shop', 'shop'], ['Custom Cakes', 'custom'], ['Gallery', 'gallery'], ['Contact', 'contact']]
  return <>
    <div className="announcement"><span>Freshly baked in Kathmandu, every day</span><b>Complimentary delivery inside Ring Road on orders above Rs. 3,000</b><span>+977 980-0000000</span></div>
    <header className="header">
      <button className="brand-button" onClick={() => go('home')} aria-label="Hazel Cake home"><Logo /></button>
      <nav className={menu ? 'nav nav-open' : 'nav'}>
        {links.map(([label, page]) => <button key={page} onClick={() => { go(page); setMenu(false) }}>{label}</button>)}
      </nav>
      <div className="header-actions">
        <button aria-label="Search"><Icon name="search" /></button>
        <button aria-label="Account" className="desktop-icon"><Icon name="user" /></button>
        <button aria-label="Shopping cart" className="cart-icon" onClick={() => go('cart')}><Icon name="bag" /><span>{cartCount}</span></button>
        <button className="menu-icon" aria-label="Menu" onClick={() => setMenu(!menu)}><Icon name={menu ? 'close' : 'menu'} /></button>
      </div>
    </header>
  </>
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-head"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function ProductCard({ product, onAdd, onView }: { product: typeof products[0]; onAdd: () => void; onView: () => void }) {
  const [liked, setLiked] = useState(false)
  return <article className="product-card">
    <div className="product-image" onClick={onView}>
      <img src={product.image} alt={product.name} />
      <span className="tag">Bestseller</span>
      <button className={`wish ${liked ? 'liked' : ''}`} onClick={(e) => { e.stopPropagation(); setLiked(!liked) }} aria-label="Add to wishlist"><Icon name="heart" /></button>
    </div>
    <div className="product-info" onClick={onView}>
      <div className="rating"><span>★★★★★</span> {product.rating} ({product.reviews})</div>
      <h3>{product.name}</h3><p>{product.note}</p>
      <div className="product-bottom"><strong>Rs. {product.price}</strong><button onClick={(e) => { e.stopPropagation(); onAdd() }}>Add to bag <Icon name="plus" size={16} /></button></div>
    </div>
  </article>
}

function Home({ go, add }: { go: (p: Page) => void; add: () => void }) {
  return <main>
    <section className="hero">
      <img src={photos.hero} alt="Elegant floral celebration cake" />
      <div className="hero-overlay" />
      <div className="hero-copy">
        <span className="eyebrow light">Handcrafted in Kathmandu</span>
        <h1>Every Celebration Deserves<br /><em>a Little Sweetness.</em></h1>
        <p>Thoughtfully designed cakes, layered with premium ingredients and made fresh for your most beautiful moments.</p>
        <div className="button-row"><Button onClick={() => go('shop')}>Explore Our Cakes</Button><Button outline onClick={() => go('custom')}>Order Custom Cake</Button></div>
      </div>
      <div className="hero-note"><span>01</span><div><b>Signature collection</b><small>Timeless flavours, artfully finished</small></div></div>
    </section>

    <section className="category-section wrap">
      <SectionHead eyebrow="Find your perfect cake" title="Made for Every Moment" text="From quiet milestones to grand celebrations, discover a cake as special as the occasion." />
      <div className="category-grid">{categories.map(([name, image], i) => <article className={`category-card ${i === 0 || i === 7 ? 'category-wide' : ''}`} key={name}>
        <img src={image} alt={name} /><div className="shade" /><div><span>0{i + 1}</span><h3>{name}</h3><button onClick={() => go('shop')}>Explore collection <Icon name="arrow" size={15} /></button></div>
      </article>)}</div>
    </section>

    <section className="products-section">
      <div className="wrap"><SectionHead eyebrow="The Hazel favourites" title="Our Bestselling Cakes" text="The cakes our customers return to, celebration after celebration." />
      <div className="product-grid">{products.slice(0, 4).map(p => <ProductCard key={p.name} product={p} onAdd={add} onView={() => go('product')} />)}</div>
      <div className="center"><Button outline onClick={() => go('shop')}>View All Cakes</Button></div></div>
    </section>

    <section className="custom-feature wrap">
      <div className="custom-image"><img src={photos.custom} alt="Bespoke floral wedding cake" /><span className="round-note">Made<br />for you</span></div>
      <div className="custom-copy"><span className="eyebrow">Bespoke cake studio</span><h2>Your Imagination,<br /><em>Our Creation.</em></h2><p>Share your story and let our cake artists bring it to life—one handcrafted detail at a time.</p>
        <ul><li><Icon name="check" />Personalised design consultation</li><li><Icon name="check" />Your choice of flavour and filling</li><li><Icon name="check" />Custom sizing for every gathering</li><li><Icon name="check" />Hand-finished in our Kathmandu studio</li></ul>
        <Button onClick={() => go('custom')}>Create Your Cake</Button>
      </div>
    </section>

    <section className="story">
      <div className="story-copy"><span className="eyebrow">Our little story</span><h2>Baked With Love,<br />Made For Memories.</h2><p>Hazel Cake began with a simple belief: a beautiful cake can turn any day into a memory. We bake in small batches, source ingredients we trust, and finish every cake by hand.</p><div className="stats"><div><strong>8+</strong><span>Years of craft</span></div><div><strong>12k</strong><span>Happy moments</span></div><div><strong>100%</strong><span>Baked fresh</span></div></div><button className="text-link" onClick={() => go('about')}>Our story <Icon name="arrow" size={16} /></button></div>
      <div className="story-image"><img src={photos.bakery} alt="Hazel Cake bakery team at work" /></div>
    </section>

    <section className="gallery wrap"><SectionHead eyebrow="A little inspiration" title="From Our Cake Studio" />
      <div className="masonry">
        {[photos.wedding, photos.chocolate, photos.pink, photos.pastry, photos.floral, photos.strawberry].map((x, i) => <div className={`tile tile-${i + 1}`} key={x}><img src={x} alt="Hazel Cake creation" /><span>@hazelcake.np</span></div>)}
      </div><div className="center"><button className="text-link" onClick={() => go('gallery')}><Icon name="instagram" /> Follow our sweet journey</button></div>
    </section>

    <section className="reviews"><div className="wrap"><SectionHead eyebrow="Kind words" title="Loved Across Kathmandu" />
      <div className="review-grid">{[
        ['“The cake was almost too beautiful to cut. Every little floral detail was perfect, and the chocolate truffle tasted heavenly.”', 'Aarushi Shrestha', 'Birthday celebration'],
        ['“Hazel made our wedding cake feel truly personal. The whole process was warm, thoughtful and completely stress-free.”', 'Nisha & Rohan', 'Wedding cake'],
        ['“Always fresh, never too sweet, and delivered exactly on time. Our family celebrations are incomplete without Hazel.”', 'Samir Maharjan', 'Loyal customer'],
      ].map(([quote, name, event], i) => <article key={name}><div className="quote">“</div><div className="stars">★★★★★</div><p>{quote}</p><div className="reviewer"><span>{name.split(' ').map(n => n[0]).join('').slice(0,2)}</span><div><b>{name}</b><small>{event}</small></div></div><em>0{i + 1}</em></article>)}</div>
    </div></section>

    <section className="promo wrap"><div><span className="eyebrow light">Celebrate a little sweeter</span><h2>Birthday coming up?</h2><p>Pre-order 48 hours ahead and enjoy a complimentary personalised cake topper.</p><Button onClick={() => go('shop')}>Order a Birthday Cake</Button></div><img src={photos.occasion} alt="Birthday cake special offer" /></section>
  </main>
}

function Shop({ go, add }: { go: (p: Page) => void; add: () => void }) {
  return <main className="page"><PageHero eyebrow="The Hazel collection" title="Cakes for Every Story" text="Freshly baked, beautifully finished, and ready to make your moment unforgettable." />
    <div className="shop-layout wrap">
      <aside className="filters"><b>Filter by</b>{['Celebration', 'Flavour', 'Price range', 'Dietary preference'].map((x, i) => <details key={x} open={i === 0}><summary>{x}<Icon name="plus" size={16} /></summary>{i === 0 && ['Birthday Cakes', 'Wedding Cakes', 'Anniversary Cakes', 'Designer Cakes'].map(c => <label key={c}><input type="checkbox" /> {c}</label>)}</details>)}</aside>
      <section className="shop-results"><div className="shop-tools"><span>Showing 6 of 24 cakes</span><select aria-label="Sort products"><option>Featured</option><option>Price: Low to high</option><option>Newest</option></select></div>
        <div className="product-grid shop-grid">{products.map(p => <ProductCard key={p.name} product={p} onAdd={add} onView={() => go('product')} />)}</div>
      </section>
    </div>
  </main>
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></section>
}

function ProductPage({ add, go }: { add: () => void; go: (p: Page) => void }) {
  const [qty, setQty] = useState(1)
  return <main className="page"><div className="breadcrumbs wrap"><button onClick={() => go('home')}>Home</button><span>/</span><button onClick={() => go('shop')}>Shop</button><span>/</span>Chocolate Truffle Cake</div>
    <section className="product-detail wrap">
      <div className="product-gallery"><div className="thumbs">{[photos.chocolate, photos.chocolate2, photos.pastry].map(x => <img key={x} src={x} alt="" />)}</div><img className="main-product" src={photos.chocolate} alt="Chocolate Truffle Cake" /></div>
      <div className="detail-copy"><span className="eyebrow">Hazel signature</span><h1>Chocolate Truffle Cake</h1><div className="rating"><span>★★★★★</span> 4.9 · 124 reviews</div><strong className="price">Rs. 1,850</strong><p>A rich, indulgent celebration of Belgian chocolate. Layers of moist cocoa sponge meet silky dark chocolate ganache, finished with hand-piped truffles.</p>
        <Choice label="Choose your flavour" options={['Chocolate truffle', 'Mocha', 'Chocolate orange']} />
        <Choice label="Choose weight" options={['1 lb · Serves 4–6', '2 lb · Serves 8–12', '3 lb · Serves 14–18']} />
        <label className="field-label">Delivery date<input type="date" /></label>
        <label className="field-label">Message on cake <input placeholder="e.g. Happy Birthday Aama!" /></label>
        <div className="detail-actions"><div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))}><Icon name="minus" size={16} /></button><span>{qty}</span><button onClick={() => setQty(qty + 1)}><Icon name="plus" size={16} /></button></div><Button onClick={add}>Add to Bag · Rs. {(1850 * qty).toLocaleString()}</Button></div>
        <div className="delivery-notes"><span><Icon name="check" /> Freshly baked to order</span><span><Icon name="check" /> Same-day delivery available</span></div>
      </div>
    </section>
  </main>
}

function Choice({ label, options }: { label: string; options: string[] }) {
  const [active, setActive] = useState(0)
  return <fieldset className="choice"><legend>{label}</legend><div>{options.map((x, i) => <button type="button" className={active === i ? 'active' : ''} key={x} onClick={() => setActive(i)}>{x}</button>)}</div></fieldset>
}

function Cart({ go, count, setCount }: { go: (p: Page) => void; count: number; setCount: (n: number) => void }) {
  return <main className="page"><PageHero eyebrow="Your selection" title="Shopping Bag" text="One step closer to something sweet." /><div className="cart-layout wrap">
    <section className="cart-items"><span>{count} item{count === 1 ? '' : 's'}</span><article><img src={photos.chocolate} alt="Chocolate Truffle Cake" /><div><span className="eyebrow">Hazel signature</span><h3>Chocolate Truffle Cake</h3><p>2 lb · Chocolate truffle<br />Message: Happy Birthday Aama!</p><button className="remove" onClick={() => setCount(0)}>Remove</button></div><div className="cart-price"><strong>Rs. 1,850</strong><div className="quantity"><button onClick={() => setCount(Math.max(0, count - 1))}><Icon name="minus" size={14} /></button><span>{count}</span><button onClick={() => setCount(count + 1)}><Icon name="plus" size={14} /></button></div></div></article></section>
    <OrderSummary go={go} />
  </div></main>
}

function OrderSummary({ go }: { go: (p: Page) => void }) {
  return <aside className="order-summary"><h3>Order summary</h3><div><span>Subtotal</span><b>Rs. 1,850</b></div><div><span>Delivery</span><b>Rs. 150</b></div><div><span>VAT (13%)</span><b>Rs. 240.50</b></div><label>Promo code<div><input placeholder="Enter code" /><button>Apply</button></div></label><div className="total"><span>Total</span><b>Rs. 2,240.50</b></div><Button onClick={() => go('checkout')}>Proceed to Checkout</Button><small>Secure checkout · Freshness guaranteed</small></aside>
}

function Checkout({ go }: { go: (p: Page) => void }) {
  const [done, setDone] = useState(false)
  if (done) return <main className="page order-done"><div className="success-icon"><Icon name="check" size={34} /></div><span className="eyebrow">Order confirmed</span><h1>Thank you, your cake is on its way.</h1><p>Order #HZL-2481 · We’ve sent your confirmation and delivery details by SMS.</p><Button onClick={() => go('home')}>Return Home</Button></main>
  return <main className="page"><PageHero eyebrow="Secure checkout" title="Complete Your Order" text="Delivery throughout Kathmandu Valley." /><div className="checkout wrap"><form onSubmit={e => { e.preventDefault(); setDone(true) }}>
    <FormSection number="01" title="Contact information"><div className="form-grid"><label>Full name<input required placeholder="Your full name" /></label><label>Phone number<input required placeholder="+977 98XXXXXXXX" /></label><label className="full">Email address<input type="email" placeholder="you@email.com" /></label></div></FormSection>
    <FormSection number="02" title="Delivery details"><div className="form-grid"><label>Province<select><option>Bagmati Province</option><option>Gandaki Province</option></select></label><label>City / Municipality<input placeholder="Kathmandu" /></label><label>Area / Tole<input placeholder="e.g. Jhamsikhel" /></label><label>Ward number<input placeholder="Ward no." /></label><label className="full">Full delivery address<input placeholder="House number, street, landmark" /></label><label>Delivery date<input type="date" /></label><label>Preferred time<select><option>10:00 AM – 1:00 PM</option><option>1:00 PM – 4:00 PM</option></select></label></div></FormSection>
    <FormSection number="03" title="Payment method"><div className="payment-grid">{['eSewa', 'Khalti', 'Cash on Delivery'].map((x,i) => <label className={i === 2 ? 'selected' : ''} key={x}><input type="radio" name="pay" defaultChecked={i===2} /><b>{x}</b><small>{i===2 ? 'Pay when your cake arrives' : 'Pay securely online'}</small></label>)}</div></FormSection>
    <Button type="submit">Place Order · Rs. 2,240.50</Button>
  </form><OrderSummary go={go} /></div></main>
}

function FormSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return <section className="form-section"><h3><span>{number}</span>{title}</h3>{children}</section>
}

function CustomPage() {
  const [sent, setSent] = useState(false)
  return <main className="page"><PageHero eyebrow="The bespoke studio" title="Create Your Dream Cake" text="Tell us your vision. Our cake artists will make it unforgettable." />
    <div className="custom-form-layout wrap"><div className="custom-side"><img src={photos.custom} alt="Custom floral cake" /><div><span className="eyebrow light">Need a little help?</span><h2>Let’s dream it up together.</h2><p>Book a complimentary design consultation with our cake artist.</p><b>+977 980-0000000</b></div></div>
      <form className="custom-form" onSubmit={e => { e.preventDefault(); setSent(true) }}>{sent ? <div className="inline-success"><Icon name="check" size={28} /><h2>Your sweet idea is with us.</h2><p>Our cake artist will contact you within one business day.</p></div> : <>
        <FormSection number="01" title="Your celebration"><div className="form-grid"><label>Occasion<select><option>Birthday</option><option>Wedding</option><option>Anniversary</option></select></label><label>Celebration date<input type="date" /></label><label>Number of guests<input placeholder="e.g. 20–25" /></label><label>Delivery location<input placeholder="Area, city" /></label></div></FormSection>
        <FormSection number="02" title="The cake"><div className="form-grid"><label>Flavour<select><option>Belgian chocolate</option><option>Red velvet</option><option>Vanilla berry</option></select></label><label>Size<select><option>2 lb</option><option>3 lb</option><option>5 lb and above</option></select></label><label className="full">Message on cake<input placeholder="Your special message" /></label><label className="full">Design preferences<textarea placeholder="Colours, theme, details, and everything you imagine…" rows={4} /></label><label className="upload full"><Icon name="upload" /><b>Upload a reference image</b><small>JPG or PNG, up to 10MB</small><input type="file" /></label></div></FormSection>
        <FormSection number="03" title="Your details"><div className="form-grid"><label>Name<input required placeholder="Full name" /></label><label>Phone<input required placeholder="+977 98XXXXXXXX" /></label></div></FormSection><Button type="submit">Request Custom Order</Button>
      </>}</form>
    </div>
  </main>
}

function GalleryPage() {
  const all = [...Object.values(photos), ...Object.values(photos).slice(0, 4)]
  return <main className="page"><PageHero eyebrow="Made by hand" title="The Hazel Gallery" text="A collection of sweet moments, hand-finished details, and unforgettable celebrations." /><div className="gallery-filters">{['All', 'Birthdays', 'Weddings', 'Designer', 'Behind the scenes'].map((x,i) => <button className={i===0?'active':''} key={x}>{x}</button>)}</div><div className="gallery-page wrap">{all.map((x,i)=><img className={`gallery-img g${i%4}`} key={i} src={x} alt="Hazel Cake gallery creation" />)}</div></main>
}

function AboutPage() {
  return <main className="page"><PageHero eyebrow="Our story" title="A Little Bakery With a Big Heart" text="Rooted in Kathmandu, inspired by the joy of gathering." /><section className="about-grid wrap"><img src={photos.bakery} alt="Inside our Kathmandu bakery" /><div><span className="eyebrow">Since 2017</span><h2>Beautiful cakes.<br />Honest ingredients.</h2><p>Hazel Cake was born in a small home kitchen from a love for slow baking and meaningful celebrations. Today, our close-knit team still brings that same care to every sponge, swirl, flower and finishing touch.</p><p>We believe premium should feel personal—not distant. That is why we listen closely, bake fresh, and treat every order like it is for our own family.</p><Button>Meet Our Team</Button></div></section><section className="values wrap"><SectionHead eyebrow="The Hazel way" title="What Matters to Us" /><div>{[['01','Fresh, always','Every cake is baked to order in small batches.'],['02','Crafted by hand','Thoughtful details made by skilled cake artists.'],['03','Made with care','Premium ingredients, trusted suppliers, no shortcuts.'],['04','Here for you','Warm, reliable service from idea to delivery.']].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section></main>
}

function ContactPage() {
  return <main className="page"><PageHero eyebrow="Say hello" title="We’d Love to Hear From You" text="Questions, celebrations or a sweet idea? Our team is here to help." /><div className="contact wrap"><div className="contact-info"><span className="eyebrow">Visit our studio</span><h2>Come by for<br />something sweet.</h2><p>Jhamsikhel, Lalitpur<br />Bagmati Province, Nepal</p><p><b>Call</b><br />+977 980-0000000</p><p><b>Email</b><br />hello@hazelcake.com.np</p><p><b>Hours</b><br />Sunday–Friday · 8:00 AM–7:00 PM<br />Saturday · 9:00 AM–6:00 PM</p></div><form className="contact-form"><div className="form-grid"><label>Name<input placeholder="Your name" /></label><label>Phone<input placeholder="+977" /></label><label className="full">Email<input type="email" placeholder="Your email" /></label><label className="full">How can we help?<select><option>General enquiry</option><option>Custom cake</option><option>Order support</option></select></label><label className="full">Message<textarea rows={5} placeholder="Tell us a little more…" /></label></div><Button>Send Message</Button></form></div><div className="map-placeholder"><span>HAZEL CAKE</span><small>Jhamsikhel · Lalitpur</small><i /></div></main>
}

function Footer({ go }: { go: (p: Page) => void }) {
  return <footer><div className="footer-main wrap"><div className="footer-brand"><Logo light /><p>Handcrafted cakes for life’s sweetest moments, baked fresh in the heart of Kathmandu.</p><div className="socials"><button>f</button><button><Icon name="instagram" size={17} /></button><button>♪</button></div></div><div><h4>Explore</h4>{[['Our Story','about'],['Shop Cakes','shop'],['Custom Cakes','custom'],['Gallery','gallery'],['Contact','contact']].map(([x,p])=><button key={x} onClick={()=>go(p as Page)}>{x}</button>)}</div><div><h4>Occasions</h4>{['Birthday Cakes','Wedding Cakes','Anniversary Cakes','Designer Cakes','Cupcakes & Pastries'].map(x=><button key={x} onClick={()=>go('shop')}>{x}</button>)}</div><div className="newsletter"><h4>Sweet notes, delivered.</h4><p>Join us for new flavours, cake inspiration and special offers.</p><label><input placeholder="Your email address" /><button aria-label="Subscribe"><Icon name="arrow" /></button></label><small>By subscribing, you agree to receive Hazel Cake news.</small></div></div><div className="footer-bottom wrap"><span>© 2025 Hazel Cake Nepal. All rights reserved.</span><div><b>eSewa</b><b>Khalti</b><b>Cash on Delivery</b></div><span>Made by Chitra Tech</span></div></footer>
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [cartCount, setCartCount] = useState(1)
  const [toast, setToast] = useState(false)
  const go = (p: Page) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const add = () => { setCartCount(c => c + 1); setToast(true); window.setTimeout(() => setToast(false), 2300) }
  useEffect(() => { document.title = 'Hazel Cake — Handcrafted in Nepal' }, [])
  return <div>
    <Header go={go} cartCount={cartCount} />
    {page === 'home' && <Home go={go} add={add} />}
    {page === 'shop' && <Shop go={go} add={add} />}
    {page === 'product' && <ProductPage add={add} go={go} />}
    {page === 'cart' && <Cart go={go} count={cartCount} setCount={setCartCount} />}
    {page === 'checkout' && <Checkout go={go} />}
    {page === 'custom' && <CustomPage />}
    {page === 'gallery' && <GalleryPage />}
    {page === 'about' && <AboutPage />}
    {page === 'contact' && <ContactPage />}
    <Footer go={go} />
    {toast && <div className="toast"><Icon name="check" /><span><b>Added to your bag</b><small>Your cake is waiting</small></span><button onClick={() => go('cart')}>View bag</button></div>}
  </div>
}
