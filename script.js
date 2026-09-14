(function(){

  const messages = [
    "Just know that every time that passes by without talking to you, I miss you",
    "I am glad I met someone like you",
    "I will never regret loving you",
    "I will never deny you coming into my life",
    "Thank you for the love that you give to me",
    "I would love you in every universe and every timeline",
    "I love how caring you are, BROCHACHOOO",
    "I love you for being you and will always love you",
    "Thank you for being my girlfriend, ngl, it made me cry, just thinking about it",
    "You are my sunshine and rainbows; you make things much brighter",
    "I love how we grow as a person with or without each other",
    "Just know that I am here for you and open to listening",
    "Ron Garcia loves you",
    "I love how we match so well; thank you for being you",
    "I will always play with you, even if magpupuyat pa ako",
    "I wish I could hold you, hold you really tight…",
    "I will always respect your decisions and feelings, but I will think about it thoroughly",
    "I am so happy I met you and grateful for all the things we've done together",
    "Just know that you are loved and appreciated; you are an amazing person",
    "I am honored to be your boyfriend. Hopefully, you're happy with me? Lawl",
    "Broo, I love your style; it represents how beautiful of a person you are",
    "You are so beautiful. It's always embarrassing for me to say, but you are really hot and cute",
    "I love talking to you. I will always be here to hear how your day went",
    "Your feelings matter so much; don't let anyone suppress that",
    "Just know that I can handle us not talking for a whole day. You will always be my girl",
    "You will always be my one and only pretty girl, BROCHACHOOO",
    "I love making things like this for you; you deserve every effort",
    "I am as devoted as it can get to you. I am as willing as a well? What am I saying?",
    "I love making you laugh. I love your laugh. It makes me happy",
    "Hey, this is an Easter egg, HOW COULD A DICTATOR MANIPULATE YOU?",
    "I really like when you try out the things that I like. I do that too",
    "Hey, hopefully everything is fine. If it's not, may I help you?",
    "I motivate you to do better today! 3, 2, 1, GOOO!",
    "Hey, I'm not even gonna lie, you have pretty good music taste",
    "I love calling you baby. MAN, I LOVE US, MAN!",
    "If only I could get to spend my time with you in real life, that would be magical",
    "I don't want any pressure in our relationship. Communicate when you feel like it",
    "You can trust me with everything. Hopefully, you open up lang naman",
    "Baby, you are so pretty with or without any makeup. I'm not lying, lad",
    "If there is something that is bothering you, don't keep it to yourself. Let me know",
    "I wish you good luck. I wish everything goes well for you",
    "I will always be willing to change/adjust for our relationship"
  ];

  const icons = ["💌","💖","⭐","🌷","🤍","💛","🎀","✨"];

  let queue = [];
  let opened = 0;
  const total = messages.length;

  function reshuffle(){
    queue = messages.map((_, i) => i);
    for (let i = queue.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
  }
  reshuffle();

  const jarWrap   = document.getElementById('jarWrap');
  const ctaBtn    = document.getElementById('ctaBtn');
  const overlay   = document.getElementById('overlay');
  const noteText  = document.getElementById('noteText');
  const noteIcon  = document.getElementById('noteIcon');
  const noteWrap  = document.querySelector('.note-wrap');
  const closeBtn  = document.getElementById('closeBtn');
  const counter   = document.getElementById('counter');

  function updateCounter(){
    if (opened >= total){
      counter.textContent = "You've opened every note 💕 restart the page to find them all again";
      counter.classList.add('show');
    }
  }

  function openJar(){
    if (jarWrap.classList.contains('disabled')) return;

    jarWrap.classList.add('disabled', 'shake');
    ctaBtn.disabled = true;

    setTimeout(() => {
      jarWrap.classList.remove('shake');

      if (queue.length === 0){
        reshuffle();
        if (opened >= total) opened = 0;
      }

      const idx = queue.pop();
      opened = Math.min(opened + 1, total);
      noteText.textContent = messages[idx];
      noteIcon.textContent = icons[Math.floor(Math.random() * icons.length)];
      noteWrap.style.transform = 'scale(0.3) translateY(40px) rotate(' + (Math.random() > 0.5 ? -6 : 6) + 'deg)';

      overlay.classList.add('show');
      updateCounter();

      jarWrap.classList.remove('disabled');
      ctaBtn.disabled = false;
    }, 480);
  }

  function closeCard(){
    overlay.classList.remove('show');
  }

  jarWrap.addEventListener('click', openJar);
  ctaBtn.addEventListener('click', openJar);
  closeBtn.addEventListener('click', closeCard);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCard(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCard(); });

  // scattered bunnies, positioned to mirror the reference layout
  // left/top are percentages of the viewport, size is a vw value (clamped)
  const bunnyLayout = [
    { left: 12, top: 25, size: 15, dur: 3.2, delay: 0.0  },
    { left: 29, top: 12, size: 9,  dur: 2.6, delay: 0.4  },
    { left: 89, top: 18, size: 15, dur: 3.4, delay: 0.9  },
    { left: 72, top: 32, size: 10, dur: 2.8, delay: 0.2  },
    { left: 27, top: 57, size: 11, dur: 3.0, delay: 0.6  },
    { left: 9,  top: 78, size: 14, dur: 3.3, delay: 1.1  },
    { left: 35, top: 88, size: 8,  dur: 2.5, delay: 0.3, hide:true },
    { left: 77, top: 63, size: 9,  dur: 2.7, delay: 0.8  },
    { left: 66, top: 89, size: 8,  dur: 2.6, delay: 0.5, hide:true },
    { left: 91, top: 82, size: 14, dur: 3.1, delay: 1.3  }
  ];

  const field = document.getElementById('bunnyField');
  bunnyLayout.forEach(function(b){
    const wrap = document.createElement('div');
    wrap.className = 'bunny' + (b.hide ? ' hide-mobile' : '');
    wrap.style.left = b.left + '%';
    wrap.style.top = b.top + '%';
    wrap.style.width = 'clamp(' + Math.round(b.size * 5.2) + 'px, ' + b.size + 'vw, ' + Math.round(b.size * 9) + 'px)';

    const img = document.createElement('img');
    img.src = 'assets/bunny.png';
    img.alt = '';
    img.draggable = false;
    img.style.animationDuration = b.dur + 's';
    img.style.animationDelay = b.delay + 's';

    wrap.appendChild(img);
    field.appendChild(wrap);
  });

})();
