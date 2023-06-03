import AbcIcon from '@mui/icons-material/Abc';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputAdornment, MenuItem, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Country from '../classes/Country';
import User from '../classes/User';
import './Registration.css';


type RegistrationProps = {
    countryAPI: string,
    submitAPI: string
}

const Registration = (props: RegistrationProps) => {

    const [formData, setFormData] = useState<User>({
        name: '',
        exp: '',
        country: '',
        skills: [],
        passport: false
    })

    const [agreement, setAgreement] = useState<boolean>(false);

    const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        setFormData((formData) => {
            let updatedSkills;

            if (checked) {
                // Add the value to the skills array
                updatedSkills = [...formData.skills, value];
            } else {
                // Remove the value from the skills array
                updatedSkills = formData.skills.filter((skill) => skill !== value);
            }
            console.log(updatedSkills)
            return {
                ...formData,
                [event.target.name]: updatedSkills,
            };
        });
    };


    const onDataCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === 'passport') {
            setFormData({
                ...formData,
                [event.target.name]: event.target.checked
            });
        } else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleReset = () => {
        console.log("Reset clicked")
        setFormData({
            name: '',
            exp: '',
            country: '',
            skills: [],
            passport: false
        });
    }

    const handleSubmit = () => {
        console.log({ formData });

        //Calling backend service
        fetch(props.submitAPI, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        handleReset();
    }

    const handleAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setAgreement(checked);
    }

    const [countryData, setCountryData] = useState<Country[]>([])


    useEffect(() => {
        fetch(props.countryAPI)
            .then((res) => res.json())
            .then(result => setCountryData(result))
            .catch(err => console.error(err));
    }, [props.countryAPI])

    return (
        <Box className='registration'>
            <FormControl sx={{ marginTop: '10px', padding: '15px', backgroundColor: '#F5F5F5' }} >
                <TextField
                    label='Full name'
                    color='secondary'
                    type='text'
                    error={!formData.name}
                    value={formData.name}
                    onChange={onDataCapture}
                    name='name'
                    inputProps={{
                        startAdornment: {
                          position: 'start',
                          children: <AbcIcon />,
                        },
                      }}
                    helperText={!formData.name ? 'Required' : ''}
                    required
                />

                <FormControl>
                    <FormLabel id='job-exp' sx={{ '&:hover': { color: '#27B3C2' } }}>Work experiance</FormLabel>
                    <RadioGroup aria-labelledby='job-exp' color='warning'
                        value={formData.exp}
                        onChange={onDataCapture}
                        name='exp'
                        row>
                        <FormControlLabel control={<Radio size='small' color='secondary' required />} label='0-2' value='0-2' />
                        <FormControlLabel control={<Radio size='small' color='secondary' required />} label='2-5' value='2-5' />
                        <FormControlLabel control={<Radio size='small' color='secondary' required />} label='5-7' value='5-7' />
                        <FormControlLabel control={<Radio size='small' color='secondary' required />} label='10-12' value='10-12' />
                    </RadioGroup>
                </FormControl>

                <TextField
                    color='success'
                    helperText={!formData.country ? 'Required' : ''}
                    label='country'
                    variant='filled'
                    value={formData.country}
                    onChange={onDataCapture}
                    name='country'
                    error={!formData.country}
                    required
                    select
                    fullWidth >
                    {countryData.map(c => {
                        return <MenuItem key={c.id} value={c.code}>{c.country}</MenuItem>
                    })}
                </TextField>

                <FormControl>
                    <FormLabel color='info' sx={{ '&:hover': { color: '#27B3C2' } }}>Skills</FormLabel>
                    <FormGroup row>
                        <FormControlLabel label='HTML' value='HTML' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('HTML')} name='skills' size='small' />} />
                        <FormControlLabel label='CSS' value='CSS' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('CSS')} name='skills' size='small' />} />
                        <FormControlLabel label='JavaScript' value='JavaScript' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('JavaScript')} name='skills' size='small' />} />
                        <FormControlLabel label='TypeScript' value='TypeScript' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('TypeScript')} name='skills' size='small' />} />
                        <FormControlLabel label='Java' value='Java' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('Java')} name='skills' size='small' />} />
                        <FormControlLabel label='Angular' value='Angular' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('Angular')} name='skills' size='small' />} />
                        <FormControlLabel label='React' value='React' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('React')} name='skills' size='small' />} />
                        <FormControlLabel label='Oracle SQL' value='Oracle SQL' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('Oracle SQL')} name='skills' size='small' />} />
                        <FormControlLabel label='MySQL' value='MySQL' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('MySQL')} name='skills' size='small' />} />
                        <FormControlLabel label='Camunda' value='Camunda' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('Camunda')} name='skills' size='small' />} />
                        <FormControlLabel label='Azure' value='Azure' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('Azure')} name='skills' size='small' />} />
                        <FormControlLabel label='AWS' value='AWS' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={formData.skills.includes('AWS')} name='skills' size='small' />} />
                    </FormGroup>
                </FormControl>

                <FormControlLabel control={<Switch color='warning' name='passport' checked={formData.passport} onChange={onDataCapture} />} label='Do you have a passport ?' labelPlacement='end' required />
                <FormControlLabel control={<Checkbox color='info' name='agreement' checked={agreement} onChange={handleAgreement} />} label='Agree terms and conditions.' labelPlacement='end' required />

                <Box>
                    <Button variant='outlined' color='success' className='registrationButtons' type='submit' onClick={handleSubmit} disabled={!formData.name || !formData.exp || !formData.country || !formData.passport || formData.skills.length === 0 || !agreement}>Submit</Button>
                    <Button variant='outlined' color='warning' className='registrationButtons' type='reset' onClick={handleReset}>Reset</Button>
                </Box>

            </FormControl>
        </Box>
    );
}

export default Registration;