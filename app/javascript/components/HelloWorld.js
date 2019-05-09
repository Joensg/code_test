import React, { Component } from 'react';
import { Alert, Breadcrumb, BreadcrumbItem,
         Button, Form, FormGroup,
         Label, Input, Col, FormFeedback } from 'reactstrap';
import axios from 'axios';

class HelloWorld extends Component {
  constructor(props) {
        super(props);

        this.state = {
            fullname: '',
            businessname: '',
            email: '',
            telnum: '',
            touched: {
                fullname: false,
                businessname: false,
                email: false,
                telnum: false
            },
            submitted: false,
            serverResponse: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    validate(fullname, businessname, email, telnum) {

        const errors = {
            fullname: '',
            businessname: '',
            email: '',
            telnum: ''
        };

        if (this.state.submitted && fullname.length === 0)
            errors.fullname = 'This field is required';
        else if (this.state.touched.fullname && fullname.length < 3)
            errors.fullname = 'Full Name should be >= 3 characters';
        else if (this.state.touched.fullname && fullname.length > 100)
            errors.fullname = 'Full Name should be <= 100 characters';

        if (this.state.submitted && businessname.length === 0)
            errors.businessname = 'This field is required';
        else if (this.state.touched.businessname && businessname.length < 3)
            errors.businessname = 'Business Name should be >= 3 characters';
        else if (this.state.touched.businessname && businessname.length > 100)
            errors.businessname = 'Business Name should be <= 100 characters';

        if (this.state.submitted && email.length === 0)
            errors.email = 'This field is required';
        else if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';

        const reg = /^\d+$/;
        if (this.state.submitted && telnum.length === 0)
            errors.telnum = 'This field is required';
        else if (this.state.touched.telnum && !reg.test(telnum))
            errors.telnum = 'Tel. Number should contain only numbers';

        return errors;
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleServerResponse(response) {
        var serverResult = ''
        if (response.data.errors.length === 0) {
            serverResult = <Alert color="success">
                                <h3>Server Results:</h3>
                                <h4>{response.data.message}</h4>
                                <p>Thank you! Your request has been submitted successfully!
                                MakeItCheaper will contact you shortly.</p>
                            </Alert>;
        } else {
            serverResult = <Alert color="danger">
                                <h3>Server Results:</h3>
                                <h4>{response.data.message}</h4>
                                {response.data.errors.map(error => (
                                  <p key={error}>Error: {error}</p>
                                ))}
                            </Alert>;
        }

        this.setState( { serverResponse: serverResult } );
    }

    handleSubmit(event) {
        this.setState( { submitted: true } );

        axios.post('http://localhost:3000/post_lead', {
          name: this.state.fullname,
          business_name: this.state.businessname,
          email: this.state.email,
          telephone_number: this.state.telnum
        })
        .then(response => {
          this.handleServerResponse(response);
        })
        .catch(error => console.log(error));

        event.preventDefault();
    }

  render () {
    const errors = this.validate(this.state.fullname, this.state.businessname, this.state.email, this.state.telnum);

    return (
      <div className="row row-content m-5">
        <div className="col-12">
          <h2>Some Test Company</h2>
          <p>Some test company details</p>
        </div>
        <div className="col-12">
          <h3>Request a Callback</h3>
        </div>
        <div className="col-12 col-md-9">
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label htmlFor="fullname" md={2}>Full Name</Label>
                    <Col md={10}>
                        <Input type="text" id="fullname" name="fullname"
                            placeholder="Full Name"
                            value={this.state.fullname}
                            valid={errors.fullname === ''}
                            invalid={errors.fullname !== ''}
                            onBlur={this.handleBlur('fullname')}
                            onChange={this.handleInputChange} />
                        <FormFeedback>{errors.fullname}</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="businessname" md={2}>Business Name</Label>
                    <Col md={10}>
                        <Input type="text" id="businessname" name="businessname"
                            placeholder="Business Name"
                            value={this.state.businessname}
                            valid={errors.businessname === ''}
                            invalid={errors.businessname !== ''}
                            onBlur={this.handleBlur('businessname')}
                            onChange={this.handleInputChange} />
                        <FormFeedback>{errors.businessname}</FormFeedback>
                    </Col>                        
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="email" md={2}>Email</Label>
                    <Col md={10}>
                        <Input type="email" id="email" name="email"
                            placeholder="Email"
                            value={this.state.email}
                            valid={errors.email === ''}
                            invalid={errors.email !== ''}
                            onBlur={this.handleBlur('email')}
                            onChange={this.handleInputChange} />
                        <FormFeedback>{errors.email}</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                    <Col md={10}>
                        <Input type="tel" id="telnum" name="telnum"
                            placeholder="Tel. number"
                            value={this.state.telnum}
                            valid={errors.telnum === ''}
                            invalid={errors.telnum !== ''}
                            onBlur={this.handleBlur('telnum')}
                            onChange={this.handleInputChange} />
                        <FormFeedback>{errors.telnum}</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={{size: 10, offset: 2}}>
                        <Button type="submit" color="primary">
                            Request Callback
                        </Button>
                    </Col>
                </FormGroup>
                <Col md={10}>
                    {this.state.serverResponse}
                </Col>
            </Form>
        </div>
     </div>
    );
  }
}

export default HelloWorld
