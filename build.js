const { build } = require('esbuild');

const production = process.env.NODE_ENV === 'production';

build({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
  target: 'es2016',
  platform: 'browser',
  entryPoints: ['src/index.tsx'],
  outdir: 'public',
  bundle: true,
  minify: production,
  sourcemap: !production,
  watch: production ? undefined : {
    onRebuild(err, result) {
      console.log('rebuild', new Date());
      if (err) {
        console.dir(err.stderr);
      }
    }
  },
}).catch(() => {
    process.stderr.write(err.stderr);
    process.exit(1)
});
