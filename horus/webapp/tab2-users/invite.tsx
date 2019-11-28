import { Button, Container, Field, Header, HeaderMenu, Segment, Loader } from 'decentraland-ui'
import React, { useState, useCallback } from 'react'
import { HORUS_CONFIG } from '../horus-config/config';


export const InviteUsers = () => {
  const [address, setAddress] = useState('');
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  const domain = HORUS_CONFIG.AUTH0_DOMAIN;

  const inviteUser = useCallback(async () => {
    function validate() {
      const newErrors = validateRequired(address, "address", {});
      return validateRequired(token, "token", newErrors);
    }

    const newErrors = validate();

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && !loading) {
      try {
        setLoading(true);
        const response = await fetch(`https://${domain}/api/v2/users`, {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            "connection": "email",
            "email": address,
            "email_verified": false,
            "verify_email": false,
            "nickname": "name",
            "user_metadata": {
              "whitelisted": true
            }
          })
        });
        if (response.status >= 400) {
          const jsonResponse = await response.json()
          setResult(`Error performing request (${response.status}): ${jsonResponse && jsonResponse.message}`);
        } else if (response.status !== 200 && response.status !== 201) {
          setResult("Unexpected response status: " + response.status);
        } else {
          setResult(`${address} invited successfully ✓`);
          setAddress("")
        }
      } catch (error) {
        setResult("Error while performing request (possibly network or protocol error): " + error)
      } finally {
        setLoading(false);
      }
    }
  }, [loading, address, token]);

  return (
    <Container>
      <Segment style={{ width: '100%' }}>
        <HeaderMenu>
          <HeaderMenu.Left>
            <Header>Invite new user</Header>
          </HeaderMenu.Left>
          <HeaderMenu.Right>
            <Header sub>Environment: {HORUS_CONFIG.ENVIRONMENT}</Header>
          </HeaderMenu.Right>
        </HeaderMenu>
        <HeaderMenu>
          <HeaderMenu.Right>
            <Header sub><a href="https://manage.auth0.com/dashboard/us/decentraland/apis/5cd32415197e9808b4862ef5/explorer" target="_blank">Get your token</a></Header>
          </HeaderMenu.Right>
        </HeaderMenu>
        {result && <p>{result}</p>}
        <Field label="Address" placeholder="satoshi@nakamoto.net" type="email" value={address} onChange={ev => setAddress(ev.target.value)} error={errors["address"]} message={errors["address"]} />
        <Field label="Auth0 Token" placeholder="" value={token} onChange={ev => 
          setToken(ev.target.value)} 
          error={errors["token"]} message={errors["token"]} />
        <Button primary onClick={inviteUser} disabled={loading}>Invite</Button>
        {loading && <Loader active size="massive" />}
      </Segment>
    </Container>
  )
}


function setError(field: string, error: string, errors: object) {
  const newErrors = Object.assign({}, errors, { [field]: error });
  return newErrors;
}

function validateRequired(value: string, field: string, errors: object) {
  if (!value) {
    return setError(field, `${field.charAt(0).toUpperCase() + field.slice(1)} is required`, errors);
  } else {
    return errors;
  }
}
