import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Eman',
                address: {
                    street: '800 fdan',
                    zipCode: '12345',
                    country: 'Egypt'
                },
                email: 'eman.test@gmail.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false});
                this.props.histroy.push('/');
            })
            .catch(error => {
                this.setState({ loading: false});
                console.log('error');
            });
    }

    render() {
        let form = (
            <form>
                    <input className={styles.Input} type='text' name='name' placeholder='Your name' />
                    <input className={styles.Input} type='text' name='email' placeholder='Your email' />
                    <input className={styles.Input} type='text' name='street' placeholder='Your street' />
                    <input className={styles.Input} type='text' name='postal' placeholder='Your postal code' />

                    <Button clicked={this.orderHandler} btnType='Success'>OREDR</Button>
                </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your form data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;