// counter State //

  document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.counter');

    const startCounting = (counter) => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix');
      let count = 0;
      const speed = 50; // smaller = faster
      const step = Math.ceil(target / 100); // increments

      const update = () => {
        if (count < target) {
          count += step;
          if (count > target) count = target;

          let display;
          if (suffix === "dot") {
            display = count.toLocaleString('de-DE'); // 5.000 format
          } else {
            display = count + suffix;
          }

          counter.innerText = display;
          requestAnimationFrame(update);
        } else {
          // Final render
          if (suffix === "dot") {
            counter.innerText = target.toLocaleString('de-DE');
          } else {
            counter.innerText = target + suffix;
          }
        }
      };

      update();
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounting(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
  });

// End of counter State //


// portfolio //


 const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  const mobileFilter = document.getElementById('mobileFilter');

  function filterItems(filter) {
    items.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.classList.add('show');
      } else {
        item.classList.remove('show');
      }
    });
  }

  // Desktop filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterItems(btn.getAttribute('data-filter'));
    });
  });

  // Mobile filter dropdown
  mobileFilter.addEventListener('change', function () {
    filterItems(this.value);
  });