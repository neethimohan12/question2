#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Exam1Stack } from '../lib/exam1-stack';

const app = new cdk.App();
new Exam1Stack(app, 'Exam1Stack', {
  

});