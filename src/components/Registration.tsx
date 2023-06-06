import AbcIcon from '@mui/icons-material/Abc';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputAdornment, MenuItem, Radio, RadioGroup, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Country from '../classes/Country';
import User from '../classes/User';


type RegistrationProps = {
    countryAPI: string,
    submitAPI: string,
    formData:User,
    setFormData:Function,
    agreement:boolean,
    setAgreement:Function
}

const Registration = (props: RegistrationProps) => {

    const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        props.setFormData((formData: { skills: any[]; }) => {
            let updatedSkills;

            if (checked) {
                // Add the value to the skills array
                updatedSkills = [...formData.skills, value];
            } else {
                // Remove the value from the skills array
                updatedSkills = formData.skills.filter((skill: string) => skill !== value);
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
            props.setFormData({
                ...props.formData,
                [event.target.name]: event.target.checked
            });
        } else {
            props.setFormData({
                ...props.formData,
                [event.target.name]: event.target.value
            });
        }
    }

    const handleReset = () => {
        console.log("Reset clicked")
        props.setFormData({
            name: '',
            exp: '',
            country: '',
            skills: [],
            passport: false
        });
    }

    const handleSubmit = () => {
        console.log(props.formData );

        //Calling backend service
        fetch(props.submitAPI, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(props.formData)
        }).then(res => res.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        handleReset();
    }

    const handleAgreement = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        props.setAgreement(checked);
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
                <Grid>
                    <TextField
                        label='Full name'
                        color='secondary'
                        type='text'
                        error={!props.formData.name}
                        value={props.formData.name}
                        onChange={onDataCapture}
                        name='name'
                        //TODO - changes not reflected
                        inputProps={{
                            startAdornment: {
                                position: 'start',
                                children: <AbcIcon />,
                            },
                        }}
                        helperText={!props.formData.name ? 'Required' : ''}
                        required
                    />

                </Grid>

                <Grid>

                    <FormControl>
                        <FormLabel id='job-exp'>Work experiance</FormLabel>
                        <RadioGroup aria-labelledby='job-exp' color='warning'
                            value={props.formData.exp}
                            onChange={onDataCapture}
                            name='exp'
                            row>
                            <FormControlLabel control={<Radio size='small' color='warning' required />} label='0-2' value='0-2' />
                            <FormControlLabel control={<Radio size='small' color='warning' required />} label='2-5' value='2-5' />
                            <FormControlLabel control={<Radio size='small' color='warning' required />} label='5-7' value='5-7' />
                            <FormControlLabel control={<Radio size='small' color='warning' required />} label='10-12' value='10-12' />
                        </RadioGroup>
                    </FormControl>
                </Grid>


                <Grid>

                    <TextField
                        color='success'
                        helperText={!props.formData.country ? 'Required' : ''}
                        label='country'
                        variant='filled'
                        value={props.formData.country}
                        onChange={onDataCapture}
                        name='country'
                        error={!props.formData.country}
                        required
                        select
                        fullWidth >
                        {countryData.map(c => {
                            return <MenuItem key={c.id} value={c.code}>{c.country}</MenuItem>
                        })}
                    </TextField>
                </Grid>

                <FormControl>
                    <FormLabel color='info'>Skills</FormLabel>
                    <FormGroup row>
                        <FormControlLabel label='HTML' value='HTML' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('HTML')} name='skills' size='small' />} />
                        <FormControlLabel label='CSS' value='CSS' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('CSS')} name='skills' size='small' />} />
                        <FormControlLabel label='JavaScript' value='JavaScript' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('JavaScript')} name='skills' size='small' />} />
                        <FormControlLabel label='TypeScript' value='TypeScript' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('TypeScript')} name='skills' size='small' />} />
                        <FormControlLabel label='Java' value='Java' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('Java')} name='skills' size='small' />} />
                        <FormControlLabel label='Angular' value='Angular' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('Angular')} name='skills' size='small' />} />
                        <FormControlLabel label='React' value='React' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('React')} name='skills' size='small' />} />
                        <FormControlLabel label='Oracle SQL' value='Oracle SQL' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('Oracle SQL')} name='skills' size='small' />} />
                        <FormControlLabel label='MySQL' value='MySQL' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('MySQL')} name='skills' size='small' />} />
                        <FormControlLabel label='Camunda' value='Camunda' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('Camunda')} name='skills' size='small' />} />
                        <FormControlLabel label='Azure' value='Azure' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('Azure')} name='skills' size='small' />} />
                        <FormControlLabel label='AWS' value='AWS' control={<Checkbox color='secondary' onChange={handleSkillChange} checked={props.formData.skills.includes('AWS')} name='skills' size='small' />} />
                    </FormGroup>
                </FormControl>

                <FormControlLabel control={<Switch color='success' name='passport' checked={props.formData.passport} onChange={onDataCapture} />} label='Do you have a passport ?' labelPlacement='end' required />
                <FormControlLabel control={<Checkbox color='info' name='agreement' checked={props.agreement} onChange={handleAgreement} />} label='Agree terms and conditions.' labelPlacement='end' required />

                <Box>
                    <Button variant='outlined' color='success' className='registrationButtons' type='submit' onClick={handleSubmit} disabled={!props.formData.name || !props.formData.exp || !props.formData.country || !props.formData.passport || props.formData.skills.length === 0 || !props.agreement}>Submit</Button>
                    <Button variant='outlined' color='warning' className='registrationButtons' type='reset' onClick={handleReset}>Reset</Button>
                </Box>

            </FormControl>
        </Box>
    );
}

export default Registration;