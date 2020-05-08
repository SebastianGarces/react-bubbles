import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
	const { register, handleSubmit, reset } = useForm();
	const history = useHistory();

	const onSubmit = (data) => {
		setTimeout(() => {
			axiosWithAuth()
				.post("/login", data)
				.then((res) => {
					localStorage.setItem("token", res.data.payload);
					history.push("/bubbles");
				})
				.catch((err) => console.error(err));
			reset();
		}, 1000);
	};
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<div className="input-group">
					<Label htmlFor="username">Username</Label>
					<Input
						type="text"
						ref={register}
						name="username"
						placeholder="enter username"
					/>
				</div>
				<div className="input-group">
					<Label htmlFor="password">Username</Label>
					<Input
						type="password"
						ref={register}
						name="password"
						placeholder="enter your password"
					/>
				</div>
        <Button type='submit'>Login</Button>
			</Form>
		</>
	);
};

const Form = styled.form`
	padding: 1rem;
	margin: 0 auto;
`;

const Label = styled.label``;
const Input = styled.input`
	padding: 0.5rem 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: lightgray;
  margin-top: 1rem;
`;

export default Login;
