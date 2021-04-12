# Player du peuple
Responsive web player for "les deux minutes du peuple".
Demo at [www.les2minutesdupeuple.ml](http://www.les2minutesdupeuple.ml).

This version is a from-scratch-project. Next release will be done with Symfony Framework 3 shiping with a cool REST API.

## Installation
### Docker installation
Add the following line in your `/etc/hosts` file:
```
127.0.0.1 dev.les2minutesdupeuple.ml
```

Then, run:
```bash
make install
```

You're done: https://dev.les2minutesdupeuple.ml

### Manual installation
#### 1. Install PHP dependencies
```bash
composer install
```

#### 2. Setup database credentials
Make a copy of `.env` and update it according to your needs:
```bash
cp .env .env.local
vi .env.local
```

#### 3. Database structure
Create database structure:

```sql
CREATE TABLE `episodes` (
  `id` int(11) NOT NULL,
  `episode_nr` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `details` varchar(255) DEFAULT NULL,
  `keywords` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
```

#### 4. Build assets
```bash
yarn install
yarn encore dev --watch
```

#### 5. Run
You can run the app using the PHP built-in server:
```bash
php -S 127.0.0.1:8080 -t public
```