import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Testimonials from './Testimonials';
import AddEditTestimonial from './AddEditTestimonial';

const TestimonialsMain = ({ match }) => {
    const { path } = match;
    return (
        <Switch>
            <Route exact path={path} component={Testimonials} />
            <Route path={`${path}/add`} component={AddEditTestimonial} />
            <Route path={`${path}/edit/:id`} component={AddEditTestimonial} />
        </Switch>
    );
}

export default TestimonialsMain;