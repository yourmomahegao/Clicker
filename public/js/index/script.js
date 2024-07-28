class Clicker {
  constructor() {
    const self = this;
    this.MainContainer = $(".main-container");
    this.SpeedElement = this.MainContainer.find("#speed");
    this.IntervalStartElement = this.MainContainer.find("#interval-start");
    this.IntervaEndElement = this.MainContainer.find("#interval-end");
    this.ToggleButtonElement = this.MainContainer.find("#toggle-button");

    // Loading toggle button
    this.ToggleButton = localStorage.getItem("TOGGLE_BUTTON");

    // Loading variables
    this.Speed = parseFloat(localStorage.getItem("VARIABLE_SPEED"));
    this.Speed = this.Speed == null ? 0 : this.Speed;
    this.IntervalStart = parseFloat(localStorage.getItem("VARIABLE_INTERVAL_START"));
    this.IntervalStart = this.IntervalStart == null ? 0 : this.IntervalStart;
    this.IntervalEnd = parseFloat(localStorage.getItem("VARIABLE_INTERVAL_END"));
    this.IntervalEnd = this.IntervalEnd == null ? 0 : this.IntervalEnd;

    // Variales
    this.ClickWorker = null;
    this.IsClicking = false;
    this.RandomInterval = 0;
    this.StartClickWorker();

    // Adding hotkeys handler
    hotkeys("*", function (e) {
      if (self.ToggleButton == e.key) {
        self.IsClicking = !self.IsClicking;
      }
    });
  }

  WorkerIteration() {
    const self = this;
    if (this.IsClicking) {
      console.log("Clicked!");
      jsautogui.mouse.click();
    }

    this.RandomInterval = Math.random() * (this.IntervalEnd - this.IntervalStart) + this.IntervalStart;
    setTimeout(function () {
      self.WorkerIteration();
    }, this.RandomInterval);

    // console.log(this.RandomInterval);
  }

  StartClickWorker() {
    console.log("Worker started!");
    this.WorkerIteration();
  }

  /**
   *When toggle button choosed
   *
   * @memberof Clicker
   */
  ToggleButtonEndInput(keyName) {
    this.ToggleButtonElement.text(keyName);
    localStorage.setItem("TOGGLE_BUTTON", keyName);
    this.ToggleButtonElement.off("keyup");
  }

  /**
   *When toggle buttons start choosing
   *
   * @returns
   * @memberof Clicker
   */
  ToggleButtonInput() {
    const self = this;

    // Adding button handler
    this.ToggleButtonElement.text("Нажмите кнопку...");
    this.ToggleButtonElement.on("keyup", function (e) {
      self.ToggleButtonEndInput(e.key);
    });
  }

  /**
   *Method will add all of the JQuery handlers
   *
   * @memberof Clicker
   */
  __AddHandlers() {
    const self = this;
    this.ToggleButtonElement.on("click", function () {
      self.ToggleButtonInput();
    });

    this.SpeedElement.on("input", function () {
      localStorage.setItem("VARIABLE_SPEED", self.SpeedEement.val());
      self.Speed = parseFloat(self.SpeedElement.val());
    });

    this.IntervalStartElement.on("input", function () {
      localStorage.setItem("VARIABLE_INTERVAL_START", self.IntervalStartElement.val());
      self.IntervalStart = parseFloat(self.IntervalStartElement.val());
    });

    this.IntervaEndElement.on("input", function () {
      localStorage.setItem("VARIABLE_INTERVAL_END", self.IntervaEndElement.val());
      self.IntervalEnd = parseFloat(self.IntervaEndElement.val());
    });
  }

  /**
   *Main initialization mathod
   *
   * @memberof Clicker
   */
  __Initialization() {
    this.__AddHandlers();

    // Getting saved button
    if (this.ToggleButton != null) {
      this.ToggleButtonEndInput(this.ToggleButton);
    }

    // Loading saved variables
    if (this.Speed != null) {
      this.SpeedElement.val(this.Speed);
    }

    if (this.IntervalStart != null) {
      this.IntervalStartElement.val(this.IntervalStart);
    }

    if (this.IntervalEnd != null) {
      this.IntervaEndElement.val(this.IntervalEnd);
    }
  }
}

var clicker = null;
$(function () {
  clicker = new Clicker();
  clicker.__Initialization();
});
