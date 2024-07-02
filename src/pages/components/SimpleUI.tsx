import {ChangeEvent, Component, MouseEvent} from "react";
import styles from "../../styles/Home.module.css";

interface SimpleUIState {
    chainId: string;
    denom: string;
    address: string;
    balance: string;
    toSend: string;
    toAddress: string;
}

export interface SimpleUIProps {
    rpcUrl: string;
}

export class SimpleUI extends Component<SimpleUIProps, SimpleUIState> {
    constructor(props: SimpleUIProps) {
        super(props);
        this.state = {
            chainId: "",
            denom: "uatom",
            address: "",
            balance: "",
            toSend: "0",
            toAddress: "",
        };
    }

    onToSendChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ toSend: event.target.value });
    }

    onToAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ toAddress: event.target.value });
    }

    onSend = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const response = await fetch(`${this.props.rpcUrl}/bank/accounts/${this.state.address}`);
        const data = await response.json();
        this.setState({ balance: data.result.value[0].amount });
    }

    render() {
        return (
            <div className={styles.container}>
                <h1>Simple UI</h1>
                <input
                    type="text"
                    value={this.state.toSend}
                    onChange={this.onToSendChange}
                    placeholder="Amount to send"
                />
                <input
                    type="text"
                    value={this.state.toAddress}
                    onChange={this.onToAddressChange}
                    placeholder="Recipient address"
                />
                <button onClick={this.onSend}>Send</button>
                <p>Balance: {this.state.balance}</p>
            </div>
        );
    }
}