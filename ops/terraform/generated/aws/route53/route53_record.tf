resource "aws_route53_record" "tfer--Z165JNQYTZW714_3zayxegwj7su2vr6t5bhaubhqldwctce-002E-_domainkey-002E-mdzhang-002E-com-002E-_CNAME_" {
  name    = "3zayxegwj7su2vr6t5bhaubhqldwctce._domainkey.mdzhang.com"
  records = ["3zayxegwj7su2vr6t5bhaubhqldwctce.dkim.amazonses.com"]
  ttl     = "1800"
  type    = "CNAME"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714__amazonses-002E-mdzhang-002E-com-002E-_TXT_" {
  name    = "_amazonses.mdzhang.com"
  records = ["j5ee+KwMRdQydZnmBfLTcXu8eEeQAXCFQgPsPR+zOVI="]
  ttl     = "1800"
  type    = "TXT"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_ansible-002D-test-002D-01-002E-mdzhang-002E-com-002E-_A_" {
  name    = "ansible-test-01.mdzhang.com"
  records = ["35.193.87.90"]
  ttl     = "300"
  type    = "A"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_ap2eae6szjer25xekk2ka74hgw2boz5l-002E-_domainkey-002E-mdzhang-002E-com-002E-_CNAME_" {
  name    = "ap2eae6szjer25xekk2ka74hgw2boz5l._domainkey.mdzhang.com"
  records = ["ap2eae6szjer25xekk2ka74hgw2boz5l.dkim.amazonses.com"]
  ttl     = "1800"
  type    = "CNAME"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_bzbfsl6cckaaoseffslr4eos3wqg27js-002E-_domainkey-002E-mdzhang-002E-com-002E-_CNAME_" {
  name    = "bzbfsl6cckaaoseffslr4eos3wqg27js._domainkey.mdzhang.com"
  records = ["bzbfsl6cckaaoseffslr4eos3wqg27js.dkim.amazonses.com"]
  ttl     = "1800"
  type    = "CNAME"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_cdn-002E-mdzhang-002E-com-002E-_A_" {
  alias {
    evaluate_target_health = "false"
    name                   = "s3-website-us-west-1.amazonaws.com"
    zone_id                = "Z2F56UZL2M1ACD"
  }

  name    = "cdn.mdzhang.com"
  type    = "A"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_dev-002E-mdzhang-002E-com-002E-_A_" {
  alias {
    evaluate_target_health = "false"
    name                   = "s3-website-us-west-1.amazonaws.com"
    zone_id                = "Z2F56UZL2M1ACD"
  }

  name    = "dev.mdzhang.com"
  type    = "A"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_email-002E-mdzhang-002E-com-002E-_CNAME_" {
  name    = "email.mdzhang.com"
  records = ["mailgun.org"]
  ttl     = "300"
  type    = "CNAME"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "mdzhang_com-002E-_A_" {
  alias {
    evaluate_target_health = "false"
    name                   = "s3-website-us-west-1.amazonaws.com"
    zone_id                = "Z2F56UZL2M1ACD"
  }

  name    = "mdzhang.com"
  type    = "A"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "mdzhang_com-002E-_MX_" {
  name    = "mdzhang.com"
  records = ["10\tmxb.mailgun.org", "10\tmxa.mailgun.org"]
  ttl     = "300"
  type    = "MX"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "mdzhang_com-002E-_NS_" {
  name    = "mdzhang.com"
  records = ["ns-809.awsdns-37.net.", "ns-181.awsdns-22.com.", "ns-1972.awsdns-54.co.uk.", "ns-1066.awsdns-05.org."]
  ttl     = "172800"
  type    = "NS"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "mdzhang_com-002E-_SOA_" {
  name    = "mdzhang.com"
  records = ["ns-809.awsdns-37.net. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
  ttl     = "900"
  type    = "SOA"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "mdzhang_com-002E-_TXT_" {
  name    = "mdzhang.com"
  records = ["globalsign-domain-verification=Mu0l5q7-DpNUoQavDtNZzf0uJbIEPoIvjC3sh0RVs4", "firebase=personal-site-staging", "v=spf1 include:mailgun.org ~all"]
  ttl     = "300"
  type    = "TXT"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_pic-002E-_domainkey-002E-mdzhang-002E-com-002E-_TXT_" {
  name    = "pic._domainkey.mdzhang.com"
  records = ["k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0A7TOc2YpqiejPrhTE8lvAju/71EXNJxesMPJMktlxyHl7mC15N6kpjf/RepiKQtiHNe3yWstDshzlRjLCWEHbWq2AATCZlfgrJKXvdIOxklHVv3hhv/nqwVNzIFK8tNNyR6ns/7+uWqmis+D8BL96wf52r5aUU6YvNNi53el8wIDAQAB"]
  ttl     = "300"
  type    = "TXT"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_staging-002D-1-002E-mdzhang-002E-com-002E-_A_" {
  alias {
    evaluate_target_health = "false"
    name                   = "s3-website-us-west-1.amazonaws.com"
    zone_id                = "Z2F56UZL2M1ACD"
  }

  name    = "staging-1.mdzhang.com"
  type    = "A"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_staging-002D-2-002E-mdzhang-002E-com-002E-_CNAME_" {
  name    = "staging-2.mdzhang.com"
  records = ["mdzhang.netlify.com"]
  ttl     = "300"
  type    = "CNAME"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}

resource "aws_route53_record" "tfer--Z165JNQYTZW714_www-002E-mdzhang-002E-com-002E-_A_" {
  alias {
    evaluate_target_health = "false"
    name                   = "s3-website-us-west-1.amazonaws.com"
    zone_id                = "Z2F56UZL2M1ACD"
  }

  name    = "www.mdzhang.com"
  type    = "A"
  zone_id = "${aws_route53_zone.mdzhang_com.zone_id}"
}
