# Create policy allowing write to S3 to GH action role
data "aws_iam_policy_document" "github_oidc_provider_s3_policy" {
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
      "s3:*"
    ]
  }
}

resource "aws_iam_policy" "github_oidc_provider_s3_policy" {
  name   = "github-oidc-assume-iam-role-mdzhang-com-policy"
  policy = data.aws_iam_policy_document.github_oidc_provider_s3_policy.json
}

# Attach the policy created in previous step
resource "aws_iam_role_policy_attachment" "github_oidc_provider_s3_policy_attachment" {
  role       = "github-oidc-assume-iam-role"
  policy_arn = aws_iam_policy.github_oidc_provider_s3_policy.arn
}
