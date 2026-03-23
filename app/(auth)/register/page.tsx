'use client';
import {
  Button,
  TextInput,
  PasswordInput,
  Divider,
  Text,
  Stack,
  Box,
  Anchor,
} from '@mantine/core';
import google from '@/assets/svg/google.svg';
import Image from 'next/image';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRegisterMutation } from '@/store/authApi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { isApiError } from '@/utils/apiError';

export default function Register() {
  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  const handleSubmit = async () => {
    try {
      const data = {
        email: form.values.email,
        password: form.values.password,
        profile: {
          full_name: form.values.fullName,
        },
      };
      await register(data).unwrap();
      toast.success('Registration successful');
      form.reset();
      router.push('/login');
    } catch (error: unknown) {
      console.error('Registration failed:', error);
      if (isApiError(error)) {
        toast.error(error.data?.email?.[0] ?? 'Registration failed');
      } else {
        toast.error('Registration failed');
      }
    }
  };

  return (
    <Box className="w-full max-w-sm h-full">
      <Stack gap="lg">
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-1">
            Create account
          </h2>
          <p className="text-gray-500 text-md font-normal">
            Sign up to start saving cheats
          </p>
        </div>

        <div>
          <Button
            variant="outline"
            size="lg"
            color="gray"
            radius="md"
            leftSection={
              <Image src={google} alt="Google" width={18} height={18} />
            }
            onClick={handleGoogleSignIn}
            fullWidth
            className="mb-6"
            styles={{
              label: { color: '#374151', fontSize: '16px', fontWeight: 500 },
              root: {
                borderColor: '#e5e7eb',
              },
            }}
          >
            Sign up with Google
          </Button>

          <Divider
            label="OR DETAILS"
            labelPosition="center"
            styles={{
              label: {
                color: '#9ca3af',
                fontSize: '12px',
                letterSpacing: '1px',
              },
              root: {
                borderColor: '#f3f4f6',
              },
            }}
          />
        </div>
        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Stack gap="md">
            <div>
              <Text size="sm" fw={500} mb={8} c="gray.7">
                Full Name
              </Text>
              <TextInput
                placeholder="John Doe"
                size="md"
                radius="md"
                required
                {...form.getInputProps('fullName')}
                styles={{
                  input: {
                    height: '50px',
                  },
                  label: {
                    fontSize: '16px',
                  },
                }}
              />
            </div>
            <div>
              <Text size="sm" fw={500} mb={8} c="gray.7">
                Email
              </Text>
              <TextInput
                placeholder="name@company.com"
                size="md"
                radius="md"
                required
                {...form.getInputProps('email')}
                styles={{
                  input: {
                    height: '50px',
                  },
                  label: {
                    fontSize: '16px',
                  },
                }}
              />
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <Text size="sm" fw={500} c="gray.7">
                  Password
                </Text>
              </div>
              <PasswordInput
                placeholder="••••••••"
                size="md"
                radius={'md'}
                required
                {...form.getInputProps('password')}
                styles={{
                  input: {
                    height: '50px',
                  },
                  label: {
                    fontSize: '16px',
                  },
                }}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              radius="md"
              fullWidth
              variant="filled"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </Stack>
        </form>

        <Text size="sm" ta="center" c="dimmed" fw={500}>
          Already have an account?{' '}
          <Anchor
            component={Link}
            href="/login"
            underline="hover"
            c={'dark'}
            fw={600}
          >
            Sign in instead
          </Anchor>
        </Text>
        <div>
          <Divider
            styles={{
              root: {
                borderColor: '#f3f4f6',
              },
            }}
          />

          <Text
            size="xs"
            ta="center"
            c="dimmed"
            my="xl"
            fw={'500'}
            lh={'1.5'}
            lts={'1px'}
          >
            © 2024 CHEATSHEETS PLATFORM
          </Text>
        </div>
      </Stack>
    </Box>
  );
}
