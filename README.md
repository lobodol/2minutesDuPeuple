Web audio player for "Les deux minutes du peuple"
========

Demo at [www.les2minutesdupeuple.tk](http://www.les2minutesdupeuple.tk).

# Installation
First of all, install PHP dependencies
```composer install```

Create the database & tables:
```
php bin/console doctirne:databse:create
php bin/console doctrine:schema:update --force
```

Then, install node dependencies:
```npm install```

Build assets:
```gulp build```

And finaly, run server:
```php bin/console server:start```

# API
This application ships with a cool API. Documentation is available at url `/api/v1/doc`.

