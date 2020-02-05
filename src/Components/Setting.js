import React from "react";
import "../scss/Setting.scss";
import { Link } from "react-router-dom";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerNum: 3,
      timer: 60,
      spyMode: false,
      spyNumber: 0,
      theme: "",
      themeKr: "",
      easterEgg: "false",
      apiData: null
    };
  }

  componentDidMount = () => {
    if (this.props.globalState.easterEgg !== "") {
      this.setState({ easterEgg: this.props.globalState.easterEgg });
    }
    // console.log('Easter Egg:', this.props.globalState.easterEgg);

    // Get data from API
    this.getDataFromDb();
  };
  getDataFromDb = () => {
    fetch("https://liar-game-api.withoutwax.now.sh/api/getData")
      .then(data => data.json())
      .then(res => {
        this.setState({ apiData: res });
      });
  };

  setPlayerNum = event => {
    this.setState({ playerNum: Number(event.target.value) });
  };
  setTimer = event => {
    if (event.target.value === "unlimited") {
      this.setState({ timer: event.target.value });
    } else {
      this.setState({ timer: Number(event.target.value) });
    }
  };
  spyModeSelect = event => {
    // console.log(this.state.spyMode);
    // console.log(event.target.type);
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    if (!value) {
      this.setState({
        spyNumber: 0
      });
    }
    this.setState({
      spyMode: value,
      spyNumber: 1
    });
  };
  setTheme = event => {
    // console.log(event.target.textContent);
    this.setState({
      theme: event.target.value,
      themeKr: event.target.textContent
    });
  };
  setSpyNumber = event => {
    this.setState({
      spyNumber: event.target.value
    });
  };

  updateGlobalState = () => {
    this.props.parentCallbackState(this.state);
  };

  render() {
    // Display 게임 시작! button when the user chooses the theme.
    let startGameButton =
      this.state.theme !== "" ? (
        <Link to="/game" onClick={this.updateGlobalState}>
          게임시작!
        </Link>
      ) : (
        ``
      );

    let themeButton = [];
    // After apiData state has value from the API
    if (this.state.apiData) {
      // console.log(this.state.apiData.data);
      themeButton = this.state.apiData.data.map(theme => {
        // console.log(theme);
        // theme.type = "food"
        // theme.typeKr = "음식"
        // theme.easterEgg = "false"
        return theme.easterEgg === "false" ||
          theme.easterEgg === this.state.easterEgg ? (
          <button value={theme.type} onClick={this.setTheme} key={theme.type}>
            {theme.typeKr}
          </button>
        ) : (
          ""
        );
      });
    }
    // console.log(themeButton);
    let spyModeSelect =
      this.state.spyMode && this.state.playerNum >= 5 ? (
        <label className="spy-num">
          <select value={this.state.value} onChange={this.setSpyNumber}>
            <option value="1">1</option>
            {this.state.playerNum >= 8 ? <option value="2">2</option> : ""}
            {this.state.playerNum >= 12 ? <option value="3">3</option> : ""}
            {this.state.playerNum >= 15 ? <option value="4">4</option> : ""}
            {this.state.playerNum >= 18 ? <option value="5">5</option> : ""}
          </select>
        </label>
      ) : (
        ""
      );

    let spyModeToggle = this.state.playerNum >= 5 ? "" : "disabled";

    return (
      <section className="setting-container">
        <h1>설정 창</h1>

        <form className="setting-form">
          <label className="player-num">
            <h2>참여인원:</h2>
            <select value={this.state.value} onChange={this.setPlayerNum}>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
          </label>
          <label className="set-timer">
            <h2>제한시간:</h2>
            <select value={this.state.value} onChange={this.setTimer}>
              <option value="60">60 초</option>
              <option value="90">90 초</option>
              <option value="120">120 초 (2분)</option>
              <option value="150">150 초 (2분 30초)</option>
              <option value="180">180 초 (3분)</option>
              <option value="240">240 초 (4분)</option>
              <option value="300">300 초 (5분)</option>
              <option value="unlimited">무제한</option>
            </select>
          </label>
          <label className="spy-mode">
            <span className="caption" style={{ fontSize: 1 + "rem" }}>
              **스파이 모드는 5명 이상일 경우 가능합니다!**
            </span>
            <br />
            <div className={`spyNumSelect ${spyModeToggle}`}>
              스파이 모드:
              {/* {`스파이 모드: ${this.state.spyMode}`} */}
              <input
                name="spyMode"
                type="checkbox"
                checked={this.state.spyMode}
                onChange={this.spyModeSelect}
                disabled={spyModeToggle}
              />
            </div>
            <br />
            {spyModeSelect}
            {/* {`스파이: ${this.state.spyNumber}`} */}
          </label>
        </form>

        <div className="theme-select">
          <h2>주제: {`${this.state.themeKr}`}</h2>
          {themeButton.map(button => {
            return button;
          })}
        </div>

        <div>{startGameButton}</div>
      </section>
    );
  }
}

export default Setting;
