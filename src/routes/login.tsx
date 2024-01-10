import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  Box,
  Form,
  Input,
  Logo,
  Switcher,
  Text,
  Wrapper,
} from '../components/auth-component';
import { auth } from '../firebase';

function Login() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || email === '' || password === '') return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      // Error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Box>
        <Logo viewBox='328 355 335 276' xmlns='http://www.w3.org/2000/svg'>
          <path
            fill='#1d9bf0'
            d='
               M 630, 425
               A 195, 195 0 0 1 331, 600
               A 142, 142 0 0 0 428, 570
               A  70,  70 0 0 1 370, 523
               A  70,  70 0 0 0 401, 521
               A  70,  70 0 0 1 344, 455
               A  70,  70 0 0 0 372, 460
               A  70,  70 0 0 1 354, 370
               A 195, 195 0 0 0 495, 442
               A  67,  67 0 0 1 611, 380
               A 117, 117 0 0 0 654, 363
               A  65,  65 0 0 1 623, 401
               A 117, 117 0 0 0 662, 390
               A  65,  65 0 0 1 630, 425
               Z'
          />
        </Logo>
      </Box>
      <Box>
        <Text>지금 일어나고 있는 일</Text>
        <Text>지금 로그인하세요.</Text>
        <Form onSubmit={onSubmit}>
          <Input
            value={email}
            onChange={onChange}
            name='email'
            type='email'
            placeholder='이메일'
            required
          />
          <Input
            value={password}
            onChange={onChange}
            name='password'
            type='password'
            placeholder='패스워드'
            required
          />
          <Input value={isLoading ? '로그인 중...' : '로그인'} type='submit' />
        </Form>
        <Switcher>
          <p>트위터 계정이 없으신가요?</p>
          <Link to='/create-account'>
            <Input value='계정 만들기' type='button' />
          </Link>
        </Switcher>
      </Box>
    </Wrapper>
  );
}

export default Login;
