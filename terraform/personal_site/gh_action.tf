# Create policy allowing write to S3 to GH action role
data "aws_iam_policy_document" "s3_policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:ListBucketVersions",
      "s3:ListBucket"
    ]
    resources = [
      aws_s3_bucket.personal_site.arn,
      "${aws_s3_bucket.personal_site.arn}/*"
    ]
  }

  statement {
    effect = "Allow"
    actions = [
      "s3:ListAllMyBuckets"
    ]
    resources = [
      "*"
    ]
  }
}

resource "aws_iam_policy" "s3_policy" {
  name   = "github-action-mdzhang-com-s3-policy"
  policy = data.aws_iam_policy_document.s3_policy.json
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role       = var.gh_action_role
  policy_arn = aws_iam_policy.s3_policy.arn
}
