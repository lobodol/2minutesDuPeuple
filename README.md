Web audio player for "Les deux minutes du peuple"
========

Demo at [www.les2minutesdupeuple.tk](http://www.les2minutesdupeuple.tk).

This web player is based on Symfony 3.

# Installation
```
git clone https://github.com/lobodol/2minutesDuPeuple.git
```

Install PHP dependencies
```
composer install
```

Create the database & tables:
```
php bin/console doctirne:database:create
php bin/console doctrine:schema:update --force
```

Then, install node dependencies:
```
npm install
node_modules/gulp/bin/gulp.js build
```

And finally, run server:
```
php bin/console server:start
```

# REST API
This application ships with a cool REST API. Documentation is available at url `/api/doc`.

