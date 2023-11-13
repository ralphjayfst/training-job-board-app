import * as React from 'react'
import { styled } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import JobData from '@/interfaces/Job'

const ValidationTextField = styled(TextField)({
  '& label': {
    color: '#E0E3E7',
  },
  '& label.Mui-focused': {
    color: '#A0AAB4',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#B2BAC2',
  },
  '& .MuiOutlinedInput-root': {
    color: '#E0E3E7',
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 1,
    },
  },
})

type Props = {
  jobId?: string | undefined;
  onSave: (data: JobData) => unknown
}

export default function JobPostForm({ jobId, onSave }: Props) {
  const [title, setTitle] = React.useState<string>('')
  const [company, setCompany] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [isActive, setIsActive] = React.useState<boolean>(true)
  const [jobResponsibilities, setJobResponsibilities] = React.useState<string[]>([])
  const save = () => {
    const data: JobData = {
      id: jobId,
      title,
      company,
      description,
      is_active: isActive,
      job_responsibilities: jobResponsibilities,
      applied_date: null
    }
    onSave(data)
  }

  React.useEffect(() => {
    const callJobPost = async () => {
      if (jobId) {
        try {
          const res = await fetch(`/api/job-posts/${jobId}`)
          const data = await res.json()
          console.log(data)
          return data
        } catch (err) {
          console.log(err)
        }
      } else {
        return
      }
    }
    callJobPost().then((data) => {
      setTitle(data ? data.title : '')
      setCompany(data ? data.company : '')
      setDescription(data ? data.description : '')
      setIsActive(data ? data.is_active : true)
      setJobResponsibilities(data ? data.job_responsibilities : [])
    })
  }, [])


  return (
    <Box
      noValidate
      component="form"
      autoComplete="off"
      sx={{
        width: '100%'
      }}
    >
      <Typography gutterBottom variant="h3" component="div">
        { `${jobId ? 'Edit' : 'Add'} Job Post` }
      </Typography>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        columnGap={2}
        rowGap={2}
      >
        <Box component="div" sx={{width: '100%'}}>
          <ValidationTextField
            required
            fullWidth
            value={title}
            label="Title"
            variant="outlined"
            id="validation-outlined-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value)
            }}
            sx={{
              mt: 2,
              mb: 1,
              mr: 2,
            }}
          />
          {
            Boolean(title == '') &&
              <FormHelperText error={Boolean(title == '')} sx={{ mx: 0 }}>
                Title is required.
              </FormHelperText>
          }
        </Box>
        <Box component="div" sx={{width: '100%'}}>
          <ValidationTextField
            required
            fullWidth
            value={company}
            label="Company"
            variant="outlined"
            id="validation-outlined-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCompany(event.target.value)
            }}
            sx={{
              mt: 2,
              mb: 1,
              mr: 2,
            }}
          />
          {
            Boolean(company == '') &&
              <FormHelperText error={Boolean(company == '')} sx={{ mx: 0 }}>
                Company is required.
              </FormHelperText>
          }
        </Box>
        <Box component="div" sx={{width: '100%'}}>
          <ValidationTextField
            multiline
            fullWidth
            rows={4}
            value={description}
            label="Description"
            variant="outlined"
            id="validation-outlined-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value)
            }}
            sx={{
              mt: 2,
              mb: 1,
              mr: 2,
            }}
          />
        </Box>
        <Box component="div" sx={{width: '100%'}}>
          <ValidationTextField
            multiline
            fullWidth
            rows={4}
            value={jobResponsibilities.join(';')}
            label="Responsibilities(Use ';' for seperator)"
            variant="outlined"
            id="validation-outlined-input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setJobResponsibilities(event.target.value.split(';'))
            }}
            sx={{
              mt: 2,
              mb: 1,
              mr: 2,
            }}
          />
        </Box>
        <FormControlLabel
          value={isActive}
          control={<Switch defaultChecked color="primary" />}
          label="Active"
          labelPlacement="start"
          onChange={(event: React.SyntheticEvent) => {
            setIsActive(event.target.checked)
          }}
          sx={{
            ml: 0
          }}
        />
        <Box>
          <Button
            variant="contained"
            color="success"
            onClick={save}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}