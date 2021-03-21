class Planner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total_income: 0,
      total_expenditure: 0,
      total_savings: 0,
      income: {},
      expenditure: {},
      savings: {},
    };
  }

  income_callback = (name, val) => {
    let dict = this.state.income;
    dict[name] = val;
    this.setState({income: dict});
    this.recalculate();
  }
  expenditure_callback = (name, val) => {
    let dict = this.state.expenditure;
    dict[name] = val;
    this.setState({expenditure: dict});
    this.recalculate();
  }
  savings_callback = (name, val) => {
    let dict = this.state.savings;
    dict[name] = val;
    this.setState({savings: dict});
    this.recalculate();
  }

  recalculate() {
    let t_income = 0;
    for (var k in this.state.income) {
      t_income += parseInt(this.state.income[k]);
    }
    let t_expenditure = 0;
    for (var k in this.state.expenditure) {
      t_expenditure += parseInt(this.state.expenditure[k]);
    }
    let t_savings = 0;
    for (var k in this.state.savings) {
      t_savings += parseInt(this.state.savings[k]);
    }
    t_savings = t_expenditure-t_savings;
    this.setState({total_income: t_income});
    this.setState({total_expenditure: t_expenditure});
    this.setState({total_savings: t_savings});
  }

  render() {
    return <div id="planner" class="width-75 left">
      <div id="income" class="left">
        <h2>Income</h2>
        <div id="income-list">
          <Money type="Income" name="Salary" onIncomeChange={this.income_callback}/>
        </div>
      </div>
      <div id="expenditure" class="min-width left">
        <h2>Spending</h2>
        <div id="expenditure-list">
          <Money type="Expenditure" name="Mortgage" onExpenditureChange={this.expenditure_callback} onSavingsChange={this.savings_callback}/>
          <Money type="Expenditure" name="Bills" onExpenditureChange={this.expenditure_callback} onSavingsChange={this.savings_callback}/>
          <Money type="Expenditure" name="General Spending" onExpenditureChange={this.expenditure_callback} onSavingsChange={this.savings_callback}/>
        </div>
      </div>
      <div class="left">
        <div class="inline-block input-field width-50">
          <h2>Total Monthly Income: {this.state.total_income}</h2>
          <h2>Total Monthly Spending: {this.state.total_expenditure}</h2>
          <h2>Total Monthly Savings: {this.state.total_savings}</h2>
        </div>
        <div class="inline-block input-field width-40">
          <h2>Monthly Spare Cash: {this.state.total_income-this.state.total_expenditure}</h2>
          <h2>Monthly Savings : {this.state.total_income-(this.state.total_expenditure-this.state.total_savings)}</h2>
          <a href='#'>
            Find ways to save
          </a>
        </div>
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
      to_age: 100
    };
  }

  processState = () => {
  }
  changeState = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    this.setState({[name]: val}, this.updateParent);
    if (name === "from_age" || name === "to_age") {
      if (!Number(val)) {
        alert("Age must be a number");
      }
    } else if (name === "amount") {
      if (this.state.value == this.state.amount) {
        this.setState({["value"]: val}, this.updateParent);
      }
    }
  }
  sliderState = (event) => {
    this.changeState(event);
    this.setState({value: event.target.value});
  }

  updateParent() {
    let amo = parseInt(this.state.amount);
    let val = parseInt(this.state.value);
    if (this.state.frequency == "Weekly") {
      amo *= (52/12);
      val *= (52/12);
    } else if (this.state.frequency === "Annual") {
      amo /= 12;
      val /= 12;
    }

    if (this.state.type === "Expenditure") {
      this.props.onExpenditureChange(this.state.name, amo);
      this.props.onSavingsChange(this.state.name, val);
    } else {
      this.props.onIncomeChange(this.state.name, amo);
    }
  }

  render() {
    let slider = ""
    if (this.state.type == "Expenditure") {
      slider = <div class="inline-block width-50 input-field">
        <h4 class="inline">Savings: {this.state.amount-this.state.value}</h4>
        <br/>
        <input type="range" name="value" min="0" max={this.state.amount} value={this.state.value} onChange={this.sliderState} class="inline width-75" />
      </div>
    }
    return <div class="left">
      <div class="inline-block width-10 input-field">
        <h3 class="inline">{this.state.name}</h3>
        <br/>
        <input type='text' name='amount' onChange={this.changeState} class="inline width-100" />
      </div>
      <div class="inline-block width-10 input-field">
        <h4 class="inline">From Age</h4>
        <br/>
        <input type='text' name='from_age' onChange={this.changeState} class="inline width-100" />
      </div>
      <div class="inline-block width-10 input-field">
        <h4 class="inline">To Age</h4>
        <br/>
        <input type='text' name='to_age' onChange={this.changeState} class="inline width-100" />
      </div>
      <div class="inline-block width-10 input-field">
        <h4 class="inline">Frequency</h4>
        <br/>
        <select name='frequency' onChange={this.changeState} class="inline" >
          <option value="Weekly">Weekly</option>
          <option value="Monthly" selected >Monthly</option>
          <option value="Annual">Annual</option>
        </select>
      </div>
      {slider}
    </div>
  }
}

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {display: true};
  }

  helped = (event) => {
    alert("I'm gladded it Helped");
    this.setState({display: false});
  }
  failed = (event) => {
    alert("I'm sorry it didn't Help");
    this.setState({display: false});
  }

  render() {
    if (!this.state.display) {
      return ""
    }
    return <div class="width-75">
      <h3> Was this Helpfull? </h3>
      <a href='#' onClick={this.helped}><img src="images/thumbs-up.png" height='32px'/></a>
      <a href='#' onClick={this.failed}><img src="images/thumbs-down.jpg" height='30px'/></a>
    </div>
  }
}

ReactDOM.render(<Planner />, document.getElementById('root'))
ReactDOM.render(<Feedback />, document.getElementById('feedback'))
