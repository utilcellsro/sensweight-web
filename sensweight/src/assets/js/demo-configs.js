window.DEMO_CONFIGS = {
  sensweight: {
    sensors: ['LC01', 'LC02', 'LC03', 'LC04', 'LC05', 'LC06', 'LC07', 'LC08'],
    base: [512.4, 498.7, 521.3, 485.2, 507.8, 493.1, 518.6, 504.9],
    jitter: 4.5, unit: 'kg', decimals: 1,
    axisMin: 460, axisMax: 545, axisStep: 21,
    color: '#476DB8', pointColor: '#2F4D89',
    summaryMode: 'sum',
  },
  senssilo: {
    sensors: ['SILO-A', 'SILO-B', 'SILO-C', 'SILO-D', 'SILO-E', 'SILO-F'],
    base: [82, 47, 19, 64, 58, 73],
    jitter: 3, unit: '%', decimals: 0,
    axisMin: 0, axisMax: 100, axisStep: 20,
    color: '#3F8F6B', pointColor: '#2F4D89',
    summaryMode: 'sum', devMode: 'absolute',
  },
};
