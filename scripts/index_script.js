class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div id="planner">
      <div id="income">
        <h2>Income</h2>
        <div id="income-list">
        </div>
      </div>
      <div id="expenditure">
        <h2>Spending</h2>
        <div id="expenditure-list">
        </div>
      </div>
      <div>
      </div>
    </div>
  }
}

class Money extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      type: props.type,
      frequency: 'Monthly',
      amount: 0,
      value: 0,
      from_age: 0,
      to_age: 100,
    };
  }

  changeState = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    if (name === "from_age" || name === "to_age") {
      if (!Number(val)) {
        alert("Age must be a number");
      }
    } else if (name === "amount") {
      if (this.state.amount == this.state.value) {
        this.setState({["value"]: val});
      }
    }
    this.setState({[name]: val});
  }
  sliderState = (event) => {
    this.changeState(event);
    this.setState({value: event.target.value});
  }

  render() {
    let slider = ""
    if (this.state.type == "Expenditure") {
      slider = <div class="inline-block min-width input-field">
        <input type="range" name="value" min="0" max={this.state.amount} value={this.state.value} onChange={this.sliderState} class="inline" />
      </div>
    }
    return <div>
      <div class="inline-block min-width input-field">
        <h3 class="inline">{this.state.name}</h3>
        <br/>
        <input type='text' name='amount' onChange={this.changeState} class="inline" />
      </div>
      <div class="inline-block min-width input-field">
        <h4 class="inline">From Age</h4>
        <br/>
        <input type='text' name='from_age' onChange={this.changeState} class="inline" />
      </div>
      <div class="inline-block min-width input-field">
        <h4 class="inline">To Age</h4>
        <br/>
        <input type='text' name='to_age' onChange={this.changeState} class="inline" />
      </div>
      <div class="inline-block min-width input-field">
        <h4 class="inline">Frequency</h4>
        <br/>
        <select name='frequency' onChange={this.changeState} class="inline" >
          <option value="weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Annual">Annual</option>
        </select>
      </div>
      {slider}
    </div>
  }
}

ReactDOM.render(<Planner />, document.getElementById('root'))
ReactDOM.render(<Money type="Income" name="Salary"/>, document.getElementById('income-list'))
ReactDOM.render(<Money type="Expenditure" name="Rent"/>, document.getElementById('expenditure-list'))
