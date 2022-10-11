import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Chart } from './Chart'

const styles = theme => ({
  content: {
    flexGrow: 1
  }
});

export const Content = props => {
  const { classes } = props
  return (
    <div className={classes.content}>
      <Grid container>
        <Grid item sm={12} md={6}>
          <Chart chartTitle="Temperatura" data={props.temperatures} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Chart chartTitle="Umidade" data={props.humidities} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Chart chartTitle="Iluminação" data={props.lights} />
        </Grid>
        <Grid item sm={12} md={6}>
          <Chart chartTitle="Umidade do ar" data={props.humiditiesAr} />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Content);

Content.defaultProps = {
  data: {}
}