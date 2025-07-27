
/**
 * Animation utilities for the CPF FIUNA website
 * These utilities help create smooth animations and transitions throughout the site
 */

/**
 * Animate a number from start to end over a duration
 * @param element The element containing the number to animate
 * @param start Starting value
 * @param end Target value
 * @param duration Animation duration in milliseconds
 * @param prefix Optional prefix to add before the number
 * @param suffix Optional suffix to add after the number
 */
export const animateNumber = (
  element: HTMLElement,
  start: number,
  end: number,
  duration: number,
  prefix = "",
  suffix = ""
) => {
  let startTimestamp: number | null = null;
  
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = `${prefix}${value}${suffix}`;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  
  window.requestAnimationFrame(step);
};

/**
 * Checks if an element is in viewport and adds a class when visible
 * @param element Element to observe
 * @param className Class to add when element is visible
 * @param threshold Visibility threshold (0-1)
 */
export const addClassWhenVisible = (
  element: HTMLElement,
  className: string,
  threshold = 0.1
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );
  
  observer.observe(element);
  
  return () => {
    observer.disconnect();
  };
};

/**
 * Stagger animations for multiple elements
 * @param elements Array of elements to animate
 * @param className Class to add to each element
 * @param delayBetween Delay between each element animation in milliseconds
 */
export const staggerAnimation = (
  elements: HTMLElement[],
  className: string,
  delayBetween = 100
) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(className);
    }, index * delayBetween);
  });
};

/**
 * Create a parallax scrolling effect
 * @param element Element to apply parallax effect to
 * @param speed Parallax speed factor (0-1)
 */
export const parallaxEffect = (element: HTMLElement, speed = 0.5) => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const yPos = -scrollY * speed;
    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
  };
  
  window.addEventListener("scroll", handleScroll);
  
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};
