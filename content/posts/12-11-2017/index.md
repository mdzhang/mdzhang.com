---
title: "Sending emails from the terminal in OS X High Sierra"
cover: "https://support.apple.com/content/dam/edam/applecare/images/en_US/macos/highsierra/macos-high-sierra-banner-hero.image.large_2x.jpg"
date: "12/10/2017"
category: "tech"
tags:
    - developer
    - environment
    - osx
    - email
---

I became curious about sending mail using OS X's `mail` command line utility, but it didn't work out of the box. To get it to work I followed [this reference][reference], though I swapped out using my password with a google app password so that `mail` would work with my account despite it using [2fa](https://www.turnon2fa.com/).

In short, make sure that:

1. your `/etc/postfix/main.cf` file looks like
    ```ini
    # this first part is defaults from `/etc/postfix/main.cf.default`
    debug_peer_level = 2
    debugger_command =
       PATH=/bin:/usr/bin:/usr/local/bin:/usr/X11R6/bin
       ddd $daemon_directory/$process_name $process_id & sleep 5

    biff = no
    command_directory = /usr/sbin
    compatibility_level = 2
    daemon_directory = /usr/libexec/postfix
    data_directory = /var/lib/postfix
    html_directory = /usr/share/doc/postfix/html
    inet_protocols = all
    mail_owner = _postfix
    mailbox_size_limit = 0
    mailq_path = /usr/bin/mailq
    manpage_directory = /usr/share/man
    message_size_limit = 10485760
    mydomain_fallback = localhost
    mynetworks = 127.0.0.0/8, [::1]/128
    newaliases_path = /usr/bin/newaliases
    queue_directory = /private/var/spool/postfix
    readme_directory = /usr/share/doc/postfix
    recipient_delimiter = +
    sample_directory = /usr/share/doc/postfix/examples
    sendmail_path = /usr/sbin/sendmail
    setgid_group = _postdrop
    smtpd_client_restrictions = permit_mynetworks permit_sasl_authenticated permit
    smtpd_tls_ciphers = medium
    tls_random_source = dev:/dev/urandom
    unknown_local_recipient_reject_code = 550

    # new additions here

    # Gmail SMTP
    relayhost=smtp.gmail.com:587
    # Enable SASL authentication in the Postfix SMTP client.
    smtp_sasl_auth_enable=yes
    smtp_sasl_password_maps=hash:/etc/postfix/sasl_passwd
    smtp_sasl_security_options=noanonymous
    smtp_sasl_mechanism_filter=plain
    # Enable Transport Layer Security (TLS), i.e. SSL.
    smtp_use_tls=yes
    smtp_tls_security_level=encrypt
    ```

1. your `/etc/postfix/sasl_passwd` file looks like
  ```
  smtp.gmail.com:587 your_email@gmail.com:your_google_app_password
  ```

    You can see how to generate a google app password [here](https://support.google.com/accounts/answer/185833)

1. `start` (or `reload`) [postfix](http://www.postfix.org/)
  ```sh
  sudo start postfix
  ```

1. And start sending mail
  ```sh
  echo 'Hello World!' | mail -s testing your_email@gmail.com
  ```

*NB*: Using application specific passwords weaken your account's security since they have direct access to your account i.e. without 2FA. They're also not application specific - if you create an environment variable `$GOOGLE_APP_PASSWORD`, anyone can use it. So you should cycle out your credentials regularly and know how to revoke them, just in case.


[reference]: http://www.developerfiles.com/how-to-send-emails-from-localhost-mac-os-x-el-capitan/
