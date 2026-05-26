particlesJS("particles-js", {

  particles: {

    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },

    color: {
      value: "#8b5cf6"
    },

    shape: {
      type: "circle"
    },

    opacity: {
      value: 0.5,
      random: true
    },

    size: {
      value: 4,
      random: true
    },

    line_linked: {
      enable: true,
      distance: 150,
      color: "#8b5cf6",
      opacity: 0.4,
      width: 1
    },

    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out"
    }

  },

  interactivity: {

    detect_on: "canvas",

    events: {

      onhover: {
        enable: true,
        mode: "grab"
      },

      onclick: {
        enable: true,
        mode: "push"
      }

    },

    modes: {

      grab: {
        distance: 180,
        line_linked: {
          opacity: 1
        }
      },

      push: {
        particles_nb: 4
      }

    }

  },

  retina_detect: true

});