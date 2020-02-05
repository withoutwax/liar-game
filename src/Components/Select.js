import React from "react";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNum: this.props.globalState.playerNum || 3,
      spyMode: this.props.globalState.spyMode,
      spyNumber: this.props.globalState.spyNumber,
      theme: this.props.globalState.theme || "food",
      vocab: "",
      liar: 1,
      spy: [],
      buttonDisabled: [],
      displayStatus: "플레이어를 선택해주세요",
      buttonDisabledText: "확인했습니다!",
      beginGame: false,
      showCardStatus: false,
      easterEgg: "",
      apiData: this.props.globalState.apiData,
      selectData: null
    };
  }

  componentDidMount = () => {
    // Set Easter Egg
    if (this.props.globalState.easterEgg !== "") {
      this.setState({ easterEgg: this.props.globalState.easterEgg });
    }

    // If the API is not present
    let chosenTheme;
    let data;
    if (this.state.apiData === null) {
      // console.log("apidata == null");
      chosenTheme = {
        food: require("../data/food.json"),
        place: require("../data/place.json"),
        occupation: require("../data/occupation.json"),
        biblecharacter: require("../data/biblecharacter.json"),
        onnurichanyangteammember: require("../data/onnurichanyangteammember.json")
      };
      // console.log(chosenTheme[this.state.theme].kr);
      data = chosenTheme[this.state.theme].kr;
    } else {
      // console.log("apidata == api");
      for (let i = 0; i < this.state.apiData.data.length; i++) {
        let words = this.state.apiData.data[i];
        if (words.type === this.state.theme) {
          // console.log(words);
          chosenTheme = words.kr;
        }
        // chosenTheme = this.state.apiData.data.kr
      }
      data = chosenTheme;
    }
    this.setState({ selectData: data });
    this.generateRandomNumber(data);
  };

  generateRandomNumber = data => {
    let randomIndex = Math.floor(Math.random() * data.length);
    let chooseLiar = Math.floor(Math.random() * this.state.playerNum);
    let chooseSpies = [];

    // eslint-disable-next-line
    while (chooseSpies.length != this.state.spyNumber) {
      let spyIndex = Math.floor(Math.random() * this.state.playerNum);

      if (spyIndex !== chooseLiar && chooseSpies.indexOf(spyIndex) === -1) {
        chooseSpies.push(spyIndex);
      }
    }

    this.setState({
      vocab: data[randomIndex],
      liar: chooseLiar,
      spy: chooseSpies
    });
  };

  showCard = event => {
    let button = Number(event.target.id);

    if (this.state.buttonDisabled.includes(button) === false) {
      this.setState({
        buttonDisabled: this.state.buttonDisabled.concat(button)
      });
    }

    let card = event.target.className;

    if (card.includes("no-liar")) {
      this.setState({
        displayStatus: `이번에 선택된 단어는:`,
        playerState: false
      });
    } else if (card.includes("spy")) {
      this.setState({
        displayStatus: `당신은`,
        playerState: true,
        spyState: true
      });
    } else {
      this.setState({
        displayStatus: `당신은`,
        playerState: true,
        spyState: false
      });
    }

    // Hide player select card during check
    this.setState({
      showCardStatus: true
    });
  };

  resetDisplayStatus = () => {
    if (this.state.buttonDisabled.length === this.state.playerNum) {
      // All Player has been selected
      console.log("모든 플레이어가 선택 되었습니다");

      // Begin Timer
      this.setState({
        displayStatus: "게임이 시작되었습니다!",
        beginGame: true
      });
      this.props.nextStage(2);
      this.props.setVocab(this.state.vocab, this.state.selectData);
    } else {
      if (this.state.playerNum - this.state.buttonDisabled.length === 1) {
        console.log("One player left");
        this.setState({ buttonDisabledText: "게임 시작!" });
      }
      this.setState({ displayStatus: "플레이어를 선택해주세요" });
    }

    // Show player select card after check
    this.setState({
      showCardStatus: false
    });
  };

  render() {
    console.log(this.state.spy, this.state.spyNumber);
    // console.log("PROPS:", this.props);
    let defaultText = "선택하세요";
    // console.log(this.state.buttonDisabled.includes(0));
    // console.log("THIS.STATE", this.state);

    let playersCard = [];
    for (let i = 0; i < this.state.playerNum; i++) {
      if (i === this.state.liar) {
        playersCard.push(
          <button
            className={`playersCard liar ${
              this.state.buttonDisabled.includes(i) ? "disabled" : ""
            }`}
            disabled={this.state.buttonDisabled.includes(i) ? true : false}
            key={i}
            id={i}
            onClick={this.showCard}
          >
            {defaultText}
          </button>
        );
      } else if (this.state.spy.indexOf(i) !== -1) {
        playersCard.push(
          <button
            className={`playersCard spy ${
              this.state.buttonDisabled.includes(i) ? "disabled" : ""
            }`}
            disabled={this.state.buttonDisabled.includes(i) ? true : false}
            key={i}
            id={i}
            onClick={this.showCard}
          >
            {defaultText}
          </button>
        );
      } else {
        playersCard.push(
          <button
            className={`playersCard no-liar ${
              this.state.buttonDisabled.includes(i) ? "disabled" : ""
            }`}
            disabled={this.state.buttonDisabled.includes(i) ? true : false}
            key={i}
            id={i}
            onClick={this.showCard}
          >
            {defaultText}
          </button>
        );
      }
    }
    console.log(this.state);
    let textView;
    if (
      this.state.buttonDisabled.length > 0 &&
      this.state.showCardStatus === true
    ) {
      if (this.state.playerState) {
        textView = this.state.spyState ? (
          <span>
            <span className="red">스파이</span> 입니다. 이번에 선택된 단어는:
            <br />
            <span className="green">{this.state.vocab}</span>
          </span>
        ) : (
          <span className="red">라이어 입니다.</span>
        );
      } else {
        textView = (
          <span className="green">
            <br />
            {this.state.vocab}
          </span>
        );
      }
    } else {
      textView = null;
    }
    let nextButton =
      this.state.displayStatus === "플레이어를 선택해주세요" ? (
        ``
      ) : (
        <button onClick={this.resetDisplayStatus}>
          {this.state.buttonDisabledText}
        </button>
      );

    return (
      <div>
        <div>
          <h2>
            {this.state.displayStatus} {textView}
          </h2>
          {nextButton}
        </div>
        {this.state.showCardStatus ? "" : playersCard}
      </div>
    );
  }
}

export default Select;
