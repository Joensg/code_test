import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem,
         Button, Form, FormGroup,
         Label, Input, Col } from 'reactstrap';

class HelloWorld extends Component {
  constructor(props) {
        super(props);

        this.state = {
            fullname: '',
            businessname: '',
            email: '',
            telnum: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

  render () {
    return (
      <div className="row row-content">
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
                            onChange={this.handleInputChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="businessname" md={2}>Business Name</Label>
                    <Col md={10}>
                        <Input type="text" id="businessname" name="businessname"
                            placeholder="Business Name"
                            value={this.state.businessname}
                            onChange={this.handleInputChange} />
                    </Col>                        
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="email" md={2}>Email</Label>
                    <Col md={10}>
                        <Input type="email" id="email" name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleInputChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                    <Col md={10}>
                        <Input type="tel" id="telnum" name="telnum"
                            placeholder="Tel. number"
                            value={this.state.telnum}
                            onChange={this.handleInputChange} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={{size: 10, offset: 2}}>
                        <Button type="submit" color="primary">
                            Request Callback
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>
     </div>
    );
  }
}

export default HelloWorld
