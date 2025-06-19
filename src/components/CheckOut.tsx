import React from 'react';
import { useEffect, useRef, useState } from 'react';
import {  Card, Container, Form } from 'react-bootstrap';
import './CheckOut.css'
import { FiMapPin } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { FaCreditCard, FaEnvelope, FaMapMarkerAlt, FaMoneyBillWave, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../slices/cartSlice';
type FormDataType = {
    name: string;
    email: string;
    address: string;
    payment: string;
};
type FormField = 'name' | 'email' | 'address' | 'payment';

type ErrorsType = {
    [key in FormField]?: string; // optional error messages
};


const Checkout = React.memo(() => {
    const [products, setProducts] = useState<any[]>([]);
    const [billingForm, setForm] = useState(true);
    const storedCart = useSelector((state: any) => state.cart.items);
    const dispatch = useDispatch()
     const navigate = useNavigate();
    const subTotal = products.reduce(
        (sum: any, item: any) => sum + (item.price * (item.quantity || 1)),
        0
    );
    useEffect(() => {
        setProducts(Array.isArray(storedCart) ? storedCart : []);
    }, [storedCart]);
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        email: '',
        address: '',
        payment: '',
    });
    const [errors, setErrors] = useState<ErrorsType>({});

    const [submittedData, setSubmittedData] = useState<FormDataType>({
        name: '',
        email: '',
        address: '',
        payment: '',
    });

    const [touched, setTouched] = useState<Record<FormField, boolean>>({
        name: false,
        email: false,
        address: false,
        payment: false,
    });
    const nameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        nameRef.current?.focus();
    }, []);


    useEffect(() => {
        nameRef.current?.focus();
    }, []);
    const validate = () => {
        const newErrors: ErrorsType = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required.';
        else if (formData.address.trim().length < 5) newErrors.address = 'Address must be at least 5 characters.';
        if (!formData.payment) newErrors.payment = 'Please select a payment option.';
        return newErrors;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (touched[name as FormField]) {
            const fieldErrors = validate();
            setErrors(prevErrors => ({ ...prevErrors, [name]: fieldErrors[name as FormField] }));
        }
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const fieldErrors = validate();
        setErrors(prevErrors => ({ ...prevErrors, [name]: fieldErrors[name as FormField] }));
    };
    const [paidAmount, setPaidAmount] = useState<number | null>(null);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validate();
        setTouched({ name: true, email: true, address: true, payment: true });
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the errors in the form before submitting.');
            return;
        }
        setForm(false);
        setErrors({});
        setSubmittedData(formData);
        setPaidAmount(subTotal);
        dispatch(clearCart());
        setTimeout(() => {
            toast.success('Thank you for your purchase!');
        }, 300);
        setTimeout(() => {
            navigate('/products', { replace: true });
        }, 2000);
        setFormData({
            name: '',
            email: '',
            address: '',
            payment: ''
        });
        setTouched({ name: false, email: false, address: false, payment: false });
    }
    const handleUseCurrentLocation = async () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();
                const location = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
                setFormData(prev => ({ ...prev, address: location }));
                setTouched(prev => ({ ...prev, address: true }));
                errors.email = ""
                const validationErrors = validate();
                if (Object.keys(validationErrors).length > 0) {
                    setErrors(validationErrors);
                    return;
                }
            } catch (error) {
                alert('Failed to fetch address');
                // console.error(error);
            }
        }, () => {
            alert('Unable to retrieve your location');
        });
    };


    return (
        <div className="d-flex justify-content-center cart-page-wrapper">
            {billingForm === true ? (
                <Container className="d-flex align-items-start shopping-cart" style={{paddingLeft:'20%'}}>
                    <Card style={{ flex: 1, width: '100%', maxWidth: '700px' }}>
                        <div className="justify-content-start align-items-start pt-3" style={{ paddingLeft: '10px' }}>
                            <h5>Billing Details</h5>
                            <hr style={{ marginRight: '10px' }} />
                            <Form onSubmit={handleSubmit} noValidate className='custom-Form'>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        className='control-field'
                                        ref={nameRef}
                                        type='text'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.name && !!errors.name}
                                        placeholder='Enter Your name..'
                                    />
                                    <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId='formEmail' className='mb-3 pt-2'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        className='control-field'
                                        type='email'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.email}
                                        placeholder='Enter your email...'
                                    />
                                    <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Address
                                    </Form.Label>
                                    <Form.Control
                                        className='control-field'
                                        as="textarea"
                                        rows={3}
                                        name='address'
                                        value={formData.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.address}
                                        placeholder='Enter your address...'
                                    />
                                    <span onClick={handleUseCurrentLocation}
                                        className="ms-2 text-primary d-inline-flex align-items-center pt-1"
                                        role="button">
                                        <FiMapPin size={18} className="me-1" />
                                        Select your current location</span>
                                    <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPayment" className="mb-3 pt-2">
                                    <Form.Label>Payment Option</Form.Label>
                                    <Form.Select
                                        className='control-field'
                                        name='payment'
                                        value={formData.payment}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.payment}
                                    >
                                        <option value="">Select</option>
                                        <option value="Credit Card">Credit Card</option>
                                        <option value="Online Payment">Online Payment</option>
                                        <option value="Cash On Delivery">Cash On Delivery</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type='invalid'>{errors.payment}</Form.Control.Feedback>
                                </Form.Group>
                                {/* disabled={!isFormValid()} */}
                                <div>
                                    
                                </div>
                                <button type="submit" className="custom-btn" style={{ marginBottom: '5%' }}>Proceed To Pay </button>
                            </Form>
                        </div>
                    </Card>

                    <Card className="summary-card sticky-card" style={{ width: '300px', height: 'fit-content' }}>
                        <div className="justify-content-start align-items-start pt-3">
                            <h5>Order Summary</h5>
                            <hr style={{ marginRight: '10px' }} />
                            {products.length === 0 ? (
                                <p><b>Your shopping cart is empty.</b></p>
                            ) : (
                                products.map((product, indexValue) => (
                                    <div className=" position-relative mb-3" key={indexValue}>
                                        <div className=" d-flex justify-content-between align-items-center mb-3">
                                            <div className="ms-2">
                                                <p className="mb-1">{product.title}</p>
                                            </div>
                                            <div>
                                                <p className="mb-1" style={{ paddingRight: '7px' }}>${product.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                                ))}

                            {products.length === 0 ? (
                                <p></p>
                            ) : (
                                <><hr style={{ marginRight: '10px' }} />
                                    <div className=" position-relative mb-3">
                                        <div className=" d-flex justify-content-between align-items-center mb-3">
                                            <div className="ms-2">
                                                <p className="mb-1 fw-bold">Total</p>
                                            </div>
                                            <div>
                                                <p className="mb-1 fw-bold" style={{ paddingRight: '7px' }}>${subTotal.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Card>
                </Container>
            ) : (
               <div style={{alignItems:'center' ,justifyContent:'center', paddingBottom:'13%',paddingTop:'3%'}}>
                 <Container className="d-flex align-items-start shopping-cart">
                    <Card style={{ flex: 1, width: '100%', maxWidth: '700px' }}>
                        <div className="justify-content-start align-items-start pt-3" style={{ paddingLeft: '10px' }}>
                            <h5>Billing Information</h5>
                            {/* <hr style={{marginRight:'10px'}}/> */}
                            <div className="mt-4 border-top pt-3">
                                <p>
                                    <FaUser style={{ marginRight: '8px' }} />
                                    <strong>Name:</strong> {submittedData.name}
                                </p>
                                <p>
                                    <FaEnvelope style={{ marginRight: '8px' }} />
                                    <strong>Email:</strong> {submittedData.email}
                                </p>
                                <p>
                                    <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                                    <strong>Address:</strong> {submittedData.address}
                                </p>
                                <p>
                                    <FaCreditCard style={{ marginRight: '8px' }} />
                                    <strong>Payment Method:</strong> {submittedData.payment}
                                </p>
                                <p>
                                    <FaMoneyBillWave style={{ marginRight: '8px' }} />
                                    <strong>Total payment:</strong> ${
                                        paidAmount !== null ? paidAmount.toFixed(2) : subTotal.toFixed(2)
                                    }
                                </p>
                            </div>

                        </div>
                    </Card>
                </Container>
               </div>
            )}
        </div>
    )
})
export default Checkout;
