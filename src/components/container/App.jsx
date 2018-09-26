import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            from: null,
            to: null,
            enteredTo: null
        };
    }

    isSelectingFirstDay = (from, to, day) => {
        const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
        const isRangeSelected = from && to;
        return !from || isBeforeFirstDay || isRangeSelected;
    }

    handleDayClick = (day) => {
        const { from, to } = this.state;
        if (from && to && day >= from && day <= to) {
            this.handleResetClick();
            return;
        }
        if (this.isSelectingFirstDay(from, to, day)) {
            this.setState({
                from: day,
                to: null,
                enteredTo: null
            });
        } else {
            this.setState({
                to: day,
                enteredTo: day
            });
        }
    }

    handleDayMouseEnter = (day) => {
        const { from, to } = this.state;
        if (!this.isSelectingFirstDay(from, to, day)) {
            this.setState({
                enteredTo: day
            });
        }        
    }

    handleResetClick = () => {
        this.setState({
            from: null,
            to: null,
            enteredTo: null
        });
    }

    render() {
        const { from, to, enteredTo } = this.state;
        const modifiers = { start: from, end: enteredTo };
        const disabledDays = { before: this.state.from };
        const selectedDays = [from, { from, to: enteredTo }];

        return (
            <div id='main-div'>
                <DayPicker
                    className="Range"
                    numberOfMonths={2}
                    fromMonth={from}
                    selectedDays={selectedDays}
                    disabledDays={disabledDays}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                    onDayMouseEnter={this.handleDayMouseEnter}
                />

                {from && to && (
                    <button className="link" onClick={this.handleResetClick}>
                        Reset
                    </button>
                )}
            </div>
        );
    }
}

export default App;