// Contact Form Submission Handling
$(document).ready(function() {
    // Contact form submission handler
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        
        // Form validation
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();
        const storeType = $('#store_type').val();
        const message = $('#message').val().trim();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        // Clear previous messages
        $('#form-messages').removeClass('text-success text-danger')
                          .empty();
        
        // Validation checks
        if (!name || name.length < 2) {
            $('#form-messages').addClass('text-danger').text('Please enter your full name (minimum 2 characters).');
            return;
        }
        
        if (!isValidEmail) {
            $('#form-messages').addClass('text-danger').text('Please enter a valid email address.');
            return;
        }
        
        if (!phone || !/^\+?1?\s?$?\d{3}$?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone)) {
            $('#form-messages').addClass('text-danger').text('Please enter a valid phone number.');
            return;
        }
        
        if (!storeType || storeType === 'select') {
            $('#form-messages').addClass('text-danger').text('Please select a store type.');
            return;
        }
        
        if (!message || message.length < 10) {
            $('#form-messages').addClass('text-danger').text('Please enter a message with at least 10 characters.');
            return;
        }
        
        // Show loading state
        const submitButton = $('button[type="submit"]');
        const originalText = submitButton.html();
        submitButton.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
        
        // Simulate form submission
        setTimeout(() => {
            // This would typically be an AJAX call to a server
            // For demo purposes, we'll show a success message
            submitButton.prop('disabled', false).html(originalText);
            $('#form-messages').addClass('text-success').text('Thank you! Your message has been sent successfully.');
            
            // Reset form after success
            $('#contact-form')[0].reset();
        }, 2000);
    });
    
    // Form input focus/blur animations
    $('.form-control').on('focus', function() {
        $(this).closest('.form-group').addClass('focused');
    }).on('blur', function() {
        if ($(this).val()) {
            $(this).closest('.form-group').removeClass('focused');
        } else {
            $(this).closest('.form-group').removeClass('focused');
        }
    }).trigger('blur'); // Initialize form group state
    
    // Hide form message when user starts typing
    $('#contact-form input, #contact-form textarea').on('input', function() {
        $('#form-messages').removeClass('text-success text-danger').empty();
    });
});