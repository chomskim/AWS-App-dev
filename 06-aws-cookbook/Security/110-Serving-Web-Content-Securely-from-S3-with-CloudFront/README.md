# Serving Web Content Securely from S3 with CloudFront

## Preparation

### Create an index.html file

```
echo AWSCookbook > index.html
```

### Set a unique suffix to use for the S3 bucket name:

```
RANDOM_STRING=$(aws secretsmanager get-random-password \
--exclude-punctuation --exclude-uppercase \
--password-length 6 --require-each-included-type \
--output text \
--query RandomPassword)
```

### Create a S3 bucket:

```
aws s3api create-bucket --bucket awscookbook110-$RANDOM_STRING
```

### Copy the previously created file to the bucket:

```
aws s3 cp index.html s3://awscookbook110-$RANDOM_STRING/
```

### Set the public access block for your bucket:

```
aws s3api put-public-access-block \
     --bucket awscookbook110-$RANDOM_STRING \
     --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

## Clean up

### Disable the CloudFront distribution by logging into the console and clicking the Disable button for the distribution that you created (this process can take up to 15 minutes)

### Delete the CloudFront distribution:

```
aws cloudfront delete-distribution --id $DISTRIBUTION_ID --if-match $(aws cloudfront get-distribution --id $DISTRIBUTION_ID --query ETag --output text)
```

### Delete the Origin Access Identity:

```
aws cloudfront delete-cloud-front-origin-access-identity --id $OAI --if-match $(aws cloudfront get-cloud-front-origin-access-identity --id $OAI --query ETag --output text)
```

### Clean up the bucket:

```
aws s3 rm s3://awscookbook110-$RANDOM_STRING/index.html
```

### Delete the S3 bucket:

```
aws s3api delete-bucket --bucket awscookbook110-$RANDOM_STRING
```

Unset your manually created environment variables:

```
unset DISTRIBUTION_ID
unset DOMAIN_NAME
unset OAI
unset RANDOM_STRING
unset BUCKET_NAME
```

## My Update

```
$ OAI=$(aws cloudfront create-cloud-front-origin-access-identity \
--cloud-front-origin-access-identity-config \
CallerReference="ep2020-note-oai",Comment="EP2020 Note OAI" \
--query CloudFrontOriginAccessIdentity.Id --output text)

$ echo $OAI
EICBWY1FRXHSL

$ sed -e "s/CLOUDFRONT_OAI/EICBWY1FRXHSL/g" \
-e "s|S3_BUCKET_NAME|ep2020.notes.com|g" \
distribution-template.json > distribution.json

$ DISTRIBUTION_ID=$(aws cloudfront create-distribution \
--distribution-config file://distribution.json \
--query Distribution.Id --output text)

$ echo $DISTRIBUTION_ID
E3PYBPW1JTCB8C

$ aws cloudfront get-distribution --id $DISTRIBUTION_ID \
--output text --query Distribution.Status
Deployed

$ sed -e "s/CLOUDFRONT_OAI/EICBWY1FRXHSL/g" \
-e "s|S3_BUCKET_NAME|ep2020.notes.com|g" \
bucket-policy-template.json > bucket-policy.json

$ aws s3api put-bucket-policy --bucket ep2020.notes.com \
--policy file://bucket-policy.json

$ http://ep2020.notes.com.s3-website.ap-northeast-2.amazonaws.com


```

#### Bucket Lifecycle rule

```
aws s3api get-bucket-lifecycle-configuration --bucket csk-sample-image
{
    "Rules": [
        {
            "ID": "Move object to Standasr-IA in case of no use 30 days",
            "Filter": {},
            "Status": "Enabled",
            "Transitions": [
                {
                    "Days": 30,
                    "StorageClass": "STANDARD_IA"
                }
            ]
        }
    ]
}

```
