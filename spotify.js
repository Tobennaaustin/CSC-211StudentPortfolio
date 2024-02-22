function getTimeOfDay() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      return "Good morning";
    } else if (hours >= 12 && hours < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  // Display the greeting
  const greetingElement = document.getElementById('greeting');
  const greeting = getTimeOfDay();
  greetingElement.textContent = greeting;