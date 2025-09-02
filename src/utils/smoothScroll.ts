export const smoothScrollTo = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

export const addSmoothScrollToLinks = () => {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href) {
        const targetId = href.replace('#', '');
        smoothScrollTo(targetId);
      }
    });
  });
};
