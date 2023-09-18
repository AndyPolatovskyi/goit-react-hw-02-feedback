import React, { Component } from "react";
import FeedbackOptions from "./FeedbackOptions/FeedbackOptions";
import Notification from "./Notification/Notification";
import Section from "./Section/Section";
import Statistics from "./Statistics/Statistics";
import css from "./App.module.css";


export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }


handleClick = option => {
  this.setState(prevState => ({
  [option]: prevState[option] + 1,
}));
}

countTotalFeedback() {
  let total = 0;
  const values = Object.values(this.state);
  for (let value of values) {
    total += value;
  }
  return total;
};
countPositiveFeedbackPercentage() {
  return this.countTotalFeedback === 0 ? 0 : Math.floor((this.state.good / this.countTotalFeedback()) * 100);
};

render() {
  const { good, neutral, bad } = this.state;
  const total = this.countTotalFeedback();
  return (
    <div className={css.container}>
      <Section title="Please leave feedback">
          <FeedbackOptions
            options={this.state}
            onLeaveFeedback={this.handleClick}
          />
        </Section>
        <Section title="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={this.countTotalFeedback()}
            positivePercentage={this.countPositiveFeedbackPercentage()}
          />
        )}
      </Section>
    </div>
    
  )
}
};


